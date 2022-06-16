import { Tournament } from '@prisma/client';

export type PlayerPlacement =
  | 'Zwycięzca'
  | 'Wicemistrz'
  | 'Trzecie miejsce'
  | 'Czwarte miejsce'
  | 'Ćwierćfinalista'
  | '1/8 finałów'
  | '1/16 finałów'
  | 'Faza grupowa'
  | 'Uczestnik';

export type Trophy = {
  tournament: Pick<Tournament, 'id' | 'name'>;
  place: 1 | 2 | 3;
};
