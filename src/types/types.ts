import { Champion, Tournament } from '@prisma/client';

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

export type UniqueChampion = Partial<Champion> & {
  count: number;
  icon: string;
  wins: number;
  loses: number;
};
