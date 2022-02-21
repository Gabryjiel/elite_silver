import { getTournamentIds } from '../prisma/queries/tournaments';

export async function getTournamentParams() {
  const tournaments = await getTournamentIds();

  return {
    paths: tournaments.map((tournament) => ({
      params: { tournamentId: String(tournament.id) },
    })),
    fallback: false,
  };
}
