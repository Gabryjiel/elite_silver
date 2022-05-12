import { Tournament } from '@prisma/client';
import { TournamentDTO } from '../../types/dtos';

export function mapToTournamentDTO(tournament: Tournament): TournamentDTO {
  return {
    ...tournament,
    startDate: tournament.startDate.toISOString(),
    endDate: tournament.endDate.toISOString(),
  };
}
