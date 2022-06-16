import prisma from '../../prisma';

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      login: true,
      players: { include: { tournament: true, playerMatches: true } },
    },
    where: {
      id,
    },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.login,
    matchCount: user.players.flatMap((player) => [...player.playerMatches])
      .length,
    tournamentCount: user.players.flatMap((player) => [player.tournamentId])
      .length,
  };
}
