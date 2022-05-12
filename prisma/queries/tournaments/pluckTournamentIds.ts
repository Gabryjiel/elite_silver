import prisma from '../../prisma';

export function pluckTournamentIds() {
  return prisma.tournament.findMany({
    select: {
      id: true,
    },
  });
}
