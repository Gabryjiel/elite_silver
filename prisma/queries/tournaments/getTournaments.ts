import { TournamentIndexDTO } from '../../../types/tournament.dto';

export async function getTournaments(): Promise<TournamentIndexDTO[]> {
  const result = await prisma.tournament.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      startDate: true,
      endDate: true,
      matches: {
        include: {
          playerMatches: true,
        },
      },
    },
  });

  const mapped = result.map((tournament) => ({
    id: tournament.id,
    name: tournament.name,
    startDate: tournament.startDate
      ?.toISOString()
      .slice(0, 10)
      .split('-')
      .reverse()
      .join('.'),
    endDate: tournament.endDate
      ?.toISOString()
      .slice(0, 10)
      .split('-')
      .reverse()
      .join('.'),
    matchCount: tournament.matches.length,
    playerCount: tournament.matches
      .map((item) => item.playerMatches.map((item) => item.playerId))
      .flat()
      .filter((v, i, a) => a.indexOf(v) === i).length,
  }));

  return mapped;
}
