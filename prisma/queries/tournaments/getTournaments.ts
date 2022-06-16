import prisma from '../../prisma';

import { TournamentIndexDTO } from '../../../src/types/tournament.dto';

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10).split('-').reverse().join('.');
}

export async function getTournaments(): Promise<TournamentIndexDTO[]> {
  const result = await prisma.tournament.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      startDate: true,
      endDate: true,
      players: true,
      games: {
        select: {
          matches: {
            include: {
              playerMatches: true,
            },
          },
        },
      },
    },
  });

  const mapped = result.map((tournament) => ({
    id: tournament.id,
    name: tournament.name,
    startDate: formatDate(tournament.startDate),
    endDate: formatDate(tournament.endDate),
    matchCount: tournament.games.length,
    playerCount: tournament.players.length,
  }));

  return mapped;
}
