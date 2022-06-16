import {
  Champion,
  Game,
  Match,
  PlayerMatch,
  Stage,
  Tournament,
} from '@prisma/client';
import { notEmpty } from '../../../src/lib/functions';
import { getSplash } from '../../../src/lib/image.helpers';
import { Trophy } from '../../../src/types/types';
import prisma from '../../prisma';

type ChampionOccurence = {
  count: number;
  name: string;
  wins: number;
};

type PlayerMatchWithChampionMatchGameStage = {
  champion: Champion | null;
  match: Match & { game: Game & { stage: Stage; tournament: Tournament } };
} & PlayerMatch;

function getFavouriteChampion(
  playerMatches: PlayerMatchWithChampionMatchGameStage[]
) {
  return (
    playerMatches
      .filter((pm) => notEmpty(pm.champion))
      .map((pm) => ({
        championName: pm.champion?.name,
        didWin: pm.match.winside === pm.side,
      }))
      .reduce<ChampionOccurence[]>((all, pm) => {
        if (!pm.championName) {
          return all;
        }

        const index = all.findIndex(
          (championOccurence) => championOccurence.name === pm.championName
        );

        if (index === -1) {
          return [
            ...all,
            { count: 1, name: pm.championName, wins: Number(pm.didWin) },
          ];
        }

        return all.map((championOccurence, allIndex) => {
          if (allIndex === index) {
            return {
              count: championOccurence.count + 1,
              name: championOccurence.name,
              wins: championOccurence.wins + Number(pm.didWin),
            };
          }

          return championOccurence;
        });
      }, [])
      .sort((a, b) => {
        if (a.count > b.count) {
          return -1;
        } else if (a.count < b.count) {
          return 1;
        }

        if (a.wins > b.wins) {
          return -1;
        } else if (a.wins < b.wins) {
          return 1;
        }

        return 0;
      })
      .at(0) ?? { name: '' }
  );
}

type MedalMatchByTournament = {
  tournament: Tournament;
  medalMatches: PlayerMatchWithChampionMatchGameStage[];
};

function getTrophies(
  playerMatches: PlayerMatchWithChampionMatchGameStage[]
): Trophy[] {
  const medalMatches = playerMatches.filter((pm) =>
    ['Final', '3rd'].includes(pm.match.game.stage.name ?? '')
  );

  if (medalMatches.length === 0) {
    return [];
  }

  return medalMatches
    .reduce<MedalMatchByTournament[]>((all, mm) => {
      const index = all.findIndex(
        (tournament) => tournament.tournament.id === mm.match.game.tournamentId
      );

      if (index === -1) {
        return [
          ...all,
          { tournament: mm.match.game.tournament, medalMatches: [mm] },
        ];
      }

      return all.map((tournament, allIndex) => {
        if (allIndex === index) {
          return {
            tournament: tournament.tournament,
            medalMatches: [...tournament.medalMatches, mm],
          };
        }

        return tournament;
      });
    }, [])
    .flatMap<Trophy>((matchByTournament) => {
      const wins = matchByTournament.medalMatches.map(
        (mm) => mm.side === mm.match.winside
      );
      const loses = matchByTournament.medalMatches.map(
        (mm) => mm.side !== mm.match.winside
      );
      const isWinner = wins > loses ? true : false;
      const stage =
        matchByTournament.medalMatches[0].match.game.stage.name ?? '';

      if (stage === 'Final') {
        if (isWinner) {
          return [
            {
              tournament: {
                id: matchByTournament.tournament.id,
                name: matchByTournament.tournament.name,
              },
              place: 1,
            },
          ];
        } else {
          return [
            {
              tournament: {
                id: matchByTournament.tournament.id,
                name: matchByTournament.tournament.name,
              },
              place: 2,
            },
          ];
        }
      } else if (stage === '3rd') {
        if (isWinner) {
          return [
            {
              tournament: {
                id: matchByTournament.tournament.id,
                name: matchByTournament.tournament.name,
              },
              place: 3,
            },
          ];
        }
      }

      return [];
    });
}

export async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      login: true,
      players: {
        include: {
          tournament: true,
          playerMatches: {
            include: {
              champion: true,
              match: {
                include: {
                  game: { include: { stage: true, tournament: true } },
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      login: 'asc',
    },
  });

  return users.map((user) => {
    const playerMatches = user.players.flatMap((player) => [
      ...player.playerMatches,
    ]);

    const favouriteChampion = getFavouriteChampion(playerMatches);
    const trophies = getTrophies(playerMatches);

    return {
      id: user.id,
      name: user.login,
      matchCount: playerMatches.length,
      tournamentCount: user.players.flatMap((player) => [player.tournamentId])
        .length,
      favouriteChampionSplashArt: getSplash(favouriteChampion.name),
      trophies,
    };
  });
}
