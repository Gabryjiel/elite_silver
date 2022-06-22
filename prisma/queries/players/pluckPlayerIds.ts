import { prisma } from '../../prisma';

export function pluckPlayerIds() {
  return prisma.user.findMany({
    select: {
      id: true,
    },
  });
}
