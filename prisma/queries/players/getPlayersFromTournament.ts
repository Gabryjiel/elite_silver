import { Champion, Player, Side, Stage, Waywin } from '@prisma/client';
import prisma from '../../prisma';
import { ArrayElement } from '../../../types/utils';
import { PlayerPlacement } from '../../../types/types';

type CustomPlayer = ArrayElement<Awaited<ReturnType<typeof getPlayers>>>;

interface UniqueChampion extends Partial<Champion> {
  count: number;
}

enum Result {
  WIN = 'WIN',
  LOSS = 'LOSS',
}

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
  rank: number | null;
  placement: PlayerPlacement;
  record: string;
  champions: UniqueChampion[];
  matches: CustomMatch[];
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

function getPlayers(tournamentId: number) {
  return prisma.player.findMany({
    include: {
      playerMatches: {
        select: {
          champion: true,
          match: {
            include: {
              playerMatches: {
                include: {
                  player: true,
                  champion: true,
                },
              },
              stage: true,
            },
          },
        },
        where: {
          match: {
            tournamentId: tournamentId,
          },
        },
      },
    },
    where: {
      playerMatches: {
        some: {
          match: {
            tournamentId: tournamentId,
          },
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  });
}

function getUniqueChampions(player: CustomPlayer) {
  const startArray: UniqueChampion[] = [];

  return player.playerMatches
    .map((pm) => {
      return {
        ...pm.champion,
        count: 1,
      };
    })
    .reduce((result, champion) => {
      const index = result.findIndex((ch) => ch.id === champion.id);

      if (index === -1) {
        return [...result, { ...champion, count: 1 }];
      }

      return result.map((res, idx) => {
        if (idx === index) {
          return { ...res, count: res.count + 1 };
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
        stage: match.stage,
        waywin: match.waywin,
        winside: match.winside,
        result: match.winside === self.side ? Result.WIN : Result.LOSS,
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
        stageId: pm.match.stage.id,
        stageName: pm.match.stage.name ?? '',
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
    const wonMatches = matches.filter((match) => match?.result === Result.WIN);
    const placement = getPlayerPlacement(player);

    return {
      id: player.id,
      name: player.name,
      rank: player.rankId,
      placement,
      record: `${wonMatches.length}/${matches.length}`,
      champions,
      matches,
    };
  });
}
