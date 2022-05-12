import { Tournament } from '@prisma/client';

export interface TournamentDTO
  extends Omit<Tournament, 'startDate' | 'endDate'> {
  startDate: string;
  endDate: string;
}
