import { PlayerPlacement } from '../../types/types';
import { AFillTrophy } from '../icons';

type Props = {
  placement: PlayerPlacement;
};

export function PlayerCardTrophy({ placement }: Props) {
  switch (placement) {
    case 'Zwycięzca':
      return (
        <AFillTrophy
          fill="orange"
          stroke="black"
          strokeWidth={25}
          width="2em"
          height="2em"
        />
      );

    case 'Wicemistrz':
      return (
        <AFillTrophy
          fill="silver"
          stroke="black"
          strokeWidth={25}
          width="2em"
          height="2em"
        />
      );
    case 'Trzecie miejsce':
      return (
        <AFillTrophy
          fill="orangered"
          stroke="black"
          strokeWidth={25}
          width="2em"
          height="2em"
        />
      );
    case 'Czwarte miejsce':
      return (
        <AFillTrophy
          fill="black"
          stroke="black"
          strokeWidth={25}
          width="2em"
          height="2em"
        />
      );
    default:
      return null;
  }
}
