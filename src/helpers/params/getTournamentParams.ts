import { getTournamentIds } from '../../queries/tournaments';

export async function getTournamentParams() {
  const tournaments = await getTournamentIds();

  return {
    paths: tournaments.map((tournament) => ({
      params: { tournamentId: String(tournament.id) },
    })),
    fallback: false,
  };
}
