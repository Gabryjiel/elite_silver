import { prisma } from '../../prisma';
import { getPlayerCardInfo } from './getPlayerCardInfo';

export async function getPlayerCardInfos(userId: number) {
  const tournaments = await prisma.tournament.findMany({
    include: {
      players: {
        where: {
          userId,
        },
      },
    },
    where: {
      players: {
        some: {
          userId,
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  });

  const promises = tournaments.map((tournament) =>
    getPlayerCardInfo(tournament.players.at(0)?.id ?? 0)
  );
  const playerInfos = await Promise.all(promises);

  return playerInfos;
}
