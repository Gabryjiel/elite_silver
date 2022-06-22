import { getIcon } from '../../../src/lib/image.helpers';
import { prisma } from '../../prisma';
import { UniqueChampion } from '../players/getPlayerUniqueChampions';

export async function getUsersChampion(userId: number) {
  const playerMatches = await prisma.playerMatch.findMany({
    include: {
      champion: true,
      match: {
        select: {
          winside: true,
        },
      },
    },
    where: {
      player: {
        userId,
      },
    },
  });

  return playerMatches
    .reduce<UniqueChampion[]>((all, cur) => {
      const index = all.findIndex(
        (champion) => champion.name === cur.champion?.name
      );

      if (!cur.championId || !cur?.champion?.name) {
        return all;
      }

      const didWin = cur.side === cur.match.winside;

      if (index === -1) {
        return [
          ...all,
          {
            id: cur.championId,
            name: cur.champion.name,
            wins: Number(didWin),
            loses: Number(!didWin),
          },
        ];
      }

      return all.map((champion, allIndex) => {
        if (allIndex === index) {
          return {
            ...champion,
            wins: champion.wins + Number(didWin),
            loses: champion.loses + Number(!didWin),
          };
        }

        return champion;
      });
    }, [])
    .map((champion) => ({
      ...champion,
      icon: getIcon(champion.name),
      count: champion.wins + champion.loses,
      winRatio: Math.round(
        (champion.wins * 100) / (champion.wins + champion.loses)
      ),
    }))
    .sort((a, b) => {
      const countDiff = b.count - a.count;

      if (countDiff !== 0) {
        return countDiff;
      }

      const winDiff = b.wins - a.wins;

      if (winDiff !== 0) {
        return winDiff;
      }

      return b.name > a.name ? -1 : 1;
    });
}
