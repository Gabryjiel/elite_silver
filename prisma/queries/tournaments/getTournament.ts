import { prisma } from '../../prisma';

export function getTournament(id: number) {
  return prisma.tournament.findUnique({
    where: { id },
  });
}
