import { Champion, Player, Side, Stage, Waywin } from '@prisma/client';
import prisma from '../../prisma';
import { ArrayElement } from '../../../src/types/utils';
import { PlayerPlacement } from '../../../src/types/types';
import { notEmpty } from '../../../src/lib/functions';
import { getIcon } from '../../../src/lib/image.helpers';

type CustomPlayer = ArrayElement<Awaited<ReturnType<typeof getPlayers>>>;

interface UniqueChampion extends Partial<Champion> {
  count: number;
  icon: string;
  wins: number;
  loses: number;
}

type Result = 'WIN' | 'LOSS';

interface CustomMatch {
  id: number;
  self: {
    champion: Champion | null;
    cs: number | null;
    side: Side;
  };
  opponent: {
    player: Player;
    champion: Champion | null;
    cs: number | null;
    side: Side;
  };
  stage: Stage;
  waywin: Waywin;
  winside: Side;
  result: Result;
  duration: number | null;
}

export interface ReturnPlayer {
  id: number;
  name: string | null;
  rank: string | null;
  placement: PlayerPlacement;
  wins: number;
  loses: number;
  record: string;
  champions: UniqueChampion[];
  matches: CustomMatch[];
}

function getPlayers(tournamentId: number) {
  return prisma.player.findMany({
    include: {
      rank: true,
      playerMatches: {
        select: {
          champion: true,
          side: true,
          match: {
            include: {
              playerMatches: {
                include: {
                  player: true,
                  champion: true,
                },
              },
              game: {
                include: {
                  stage: true,
                },
              },
            },
          },
        },
        where: {
          match: {
            game: {
              tournamentId,
            },
          },
        },
      },
    },
    where: {
      playerMatches: {
        some: {
          match: {
            game: {
              tournamentId,
            },
          },
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
}

function getUniqueChampions(player: CustomPlayer) {
  const startArray: UniqueChampion[] = [];

  return player.playerMatches
    .filter((pm) => Boolean(pm.champion?.name))
    .map((pm) => {
      return {
        ...pm.champion,
        didWin: pm.side === pm.match.winside,
        icon: getIcon(pm.champion?.name ?? ''),
        count: 1,
      };
    })
    .reduce((result, champion) => {
      const index = result.findIndex((ch) => ch.id === champion.id);

      if (index === -1) {
        return [
          ...result,
          {
            ...champion,
            count: 1,
            wins: Number(champion.didWin),
            loses: Number(!champion.didWin),
          },
        ];
      }

      return result.map((res, idx) => {
        if (idx === index) {
          return {
            ...res,
            count: res.count + 1,
            wins: res.wins + Number(champion.didWin),
            loses: res.loses + Number(!champion.didWin),
          };
        }

        return res;
      });
    }, startArray);
}

function getAllMatches(player: CustomPlayer): CustomMatch[] {
  return player.playerMatches
    .map((pm) => pm.match)
    .map((match) => {
      const self = match.playerMatches.find((pm) => pm.playerId === player.id);
      const opponent = match.playerMatches.find(
        (pm) => pm.playerId !== player.id
      );

      if (!self || !opponent) {
        return null;
      }

      return {
        id: match.id,
        self: {
          champion: self.champion,
          cs: self.cs,
          side: self.side,
        },
        opponent: {
          champion: opponent.champion,
          cs: opponent.cs,
          player: opponent.player,
          side: opponent.side,
        },
        stage: match.game.stage,
        waywin: match.waywin,
        winside: match.winside,
        result: (match.winside === self.side ? 'WIN' : 'LOSS') as Result,
        duration: match.duration,
      };
    })
    .filter(notEmpty);
}

function getPlayerPlacement(player: CustomPlayer): PlayerPlacement {
  function getLabel(stageName: string, isWinner: boolean) {
    switch (stageName) {
      case 'Final':
        if (isWinner) {
          return 'Zwycięzca';
        }
        return 'Wicemistrz';
      case '3rd':
        if (isWinner) {
          return 'Trzecie miejsce';
        }
        return 'Czwarte miejsce';
      case '1/4':
        return 'Ćwierćfinalista';
      case '1/8':
        return '1/8 finałów';
      case '1/16':
        return '1/16 finałów';
      default:
        return 'Faza grupowa';
    }
  }

  const placement = player.playerMatches
    .map((pm) => {
      const self = pm.match.playerMatches.find(
        (pm) => pm.playerId === player.id
      );

      if (!self) {
        return null;
      }

      return {
        stageId: pm.match.game.stage.id,
        stageName: pm.match.game.stage.name ?? '',
        didWin: self.side === pm.match.winside,
      };
    })
    .filter(notEmpty);

  const indexOfMaxStage = Math.max(...placement.map((p) => p.stageId));
  const finalPlacement = placement.find((p) => p.stageId === indexOfMaxStage);

  if (!finalPlacement) {
    return 'Uczestnik';
  }

  return getLabel(finalPlacement.stageName, finalPlacement.didWin);
}

export async function getPlayersFromTournament(
  tournamentId: number
): Promise<ReturnPlayer[]> {
  const players = await getPlayers(tournamentId);

  return players.map((player) => {
    const champions = getUniqueChampions(player);
    const matches = getAllMatches(player);
    const wonMatches = matches.filter((match) => match?.result === 'WIN');
    const lostMatches = matches.filter((match) => match?.result === 'LOSS');
    const placement = getPlayerPlacement(player);

    return {
      id: player.id,
      name: player.name,
      rank: player.rank?.name ?? null,
      placement,
      record: `${wonMatches.length}/${matches.length}`,
      wins: wonMatches.length,
      loses: lostMatches.length,
      champions,
      matches,
    };
  });
}
