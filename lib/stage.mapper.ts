/* eslint-disable no-fallthrough */
import { Match, Stage, PlayerMatch, Player } from '@prisma/client';
import { PlayerPlacement } from '../types/types';

export function getStageValue(stage: Stage) {
  let value = 0;

  switch (stage.name) {
    case 'Final':
      value++;
    case '3rd':
      value++;
    case '1/2':
      value++;
    case '1/4':
      value++;
    case '1/8':
      value++;
    case '1/16':
      value++;
    case 'A':
    case 'B':
    case 'C':
    case 'D':
    case 'E':
    case 'F':
    case 'G':
    case 'H':
      value++;
  }

  return value;
}

interface LastMatch {
  playerMatches: PlayerMatch[];
  stage: Stage;
}

export function getPlayerPlacement(
  match: Match & LastMatch,
  player: Player
): PlayerPlacement {
  const playerSide = match.playerMatches.find(
    (pm) => pm.playerId === player.id
  )?.side;
  const isWinner = playerSide === match.winside;

  switch (match.stage.name) {
    case 'Final':
      if (isWinner) {
        return 'Zwycięzca';
      }
      return 'Wicemistrz';
    case '3rd':
      if (isWinner) {
        return 'Trzecie miejsce';
      }
      return 'Czwarte miejsce';
    case '1/4':
      return 'Ćwierćfinalista';
    case '1/8':
      return '1/8 finałów';
    case '1/16':
      return '1/16 finałów';
    default:
      return 'Faza grupowa';
  }
}
