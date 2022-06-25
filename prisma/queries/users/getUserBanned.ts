import { getIcon } from '../../../src/lib/image.helpers';
import { prisma } from '../../prisma';

type Opponent = {
  id: number;
  name: string;
  count: number;
};

type UserBan = {
  id: number;
  name: string;
  slug: string;
  count: number;
  icon: string;
  opponents: Opponent[];
};

export async function getUserBanned(userId: number) {
  const userBanned = await prisma.ban.findMany({
    select: {
      playerMatch: {
        select: {
          match: {
            select: {
              playerMatches: {
                select: {
                  player: {
                    select: {
                      user: {
                        select: {
                          id: true,
                          login: true,
                        },
                      },
                    },
                  },
                },
                where: {
                  player: {
                    userId: {
                      not: userId,
                    },
                  },
                },
              },
            },
          },
        },
      },
      champion: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    where: {
      playerMatch: {
        match: {
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

  return userBanned
    .reduce<UserBan[]>((all, cur) => {
      const index = all.findIndex((item) => item.id === cur.champion.id);

      const opponents = [
        {
          id: cur.playerMatch.match.playerMatches[0].player.user.id,
          name: cur.playerMatch.match.playerMatches[0].player.user.login,
          count: 1,
        },
      ];

      if (index === -1) {
        return [
          ...all,
          {
            id: cur.champion.id,
            name: cur.champion.name,
            slug: cur.champion.slug,
            icon: getIcon(cur.champion.name),
            count: 1,
            opponents,
          },
        ];
      }

      return all.map((item, allIndex) => {
        if (index === allIndex) {
          return {
            ...item,
            count: item.count + 1,
            opponents: [...item.opponents, ...opponents],
          };
        }

        return item;
      });
    }, [])
    .map((ban) => {
      const opponents = ban.opponents.reduce<Opponent[]>((all, cur) => {
        const index = all.findIndex((item) => item.name === cur.name);

        if (index === -1) {
          return [...all, { ...cur, count: 1 }];
        }

        return all.map((item, allIndex) => {
          if (allIndex === index) {
            return { ...item, count: item.count + 1 };
          }

          return item;
        });
      }, []);

      return {
        ...ban,
        opponents,
      };
    })
    .sort((a, b) => b.count - a.count);
}
