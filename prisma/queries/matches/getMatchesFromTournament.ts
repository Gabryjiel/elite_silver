import { prisma } from '../../prisma';

export type GetMatchesFromTournamentT = Awaited<
  ReturnType<typeof getMatchesFromTournament>
>;

export async function getMatchesFromTournament(tournamentId: number) {
  const matches = await prisma.match.findMany({
    select: {
      id: true,
      game: {
        include: {
          stage: true,
        },
      },
      waywin: true,
      winside: true,
      duration: true,
      playerMatches: {
        select: {
          id: true,
          player: true,
          champion: true,
          cs: true,
          side: true,
          bans: {
            select: {
              id: true,
              champion: true,
            },
          },
        },
      },
    },
    where: {
      game: {
        tournamentId,
      },
    },
    orderBy: {
      id: 'asc',
    },
  });

  return matches;
}
