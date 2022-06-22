import { prisma } from 'prisma/prisma';
import { getIcon } from '../../../src/lib/image.helpers';

type UniqueChampion = {
  id: number;
  name: string;
  wins: number;
  loses: number;
};

export async function getPlayerUniqueChampions(playerId: number) {
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
      playerId,
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
    }));
}
