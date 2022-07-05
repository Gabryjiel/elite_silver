import { ArrayElement } from '../../../src/types';
import { prisma } from '../../prisma';

export async function getUserMatches(userId: number) {
  const games = await prisma.game.findMany({
    include: {
      tournament: true,
      stage: true,
      matches: {
        include: {
          playerMatches: {
            include: {
              bans: {
                include: {
                  champion: true,
                },
              },
              champion: true,
              player: true,
            },
          },
        },
      },
    },
    where: {
      matches: {
        every: {
          playerMatches: {
            some: {
              player: {
                userId,
              },
            },
          },
        },
      },
    },
  });

  function getGameScore(game: ArrayElement<typeof games>) {
    let player1 = 0;
    let player2 = 0;

    game.matches.map((match) =>
      match.playerMatches.forEach((pm) => {
        if (pm.side === match.winside) {
          if (pm.playerId === match.playerMatches[0].playerId) {
            player1++;
          } else if (pm.playerId === match.playerMatches[1].playerId) {
            player2++;
          }
        }
      })
    );

    return { score: { player1, player2 } };
  }

  return games.map((game) => ({
    ...game,
    ...getGameScore(game),
    tournament: {
      ...game.tournament,
      startDate: game.tournament.startDate.toDateString(),
      endDate: game.tournament.endDate.toDateString(),
    },
  }));
}
