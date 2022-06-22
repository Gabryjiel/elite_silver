import { PlayerMatch, Side, Stage } from '@prisma/client';
import { notEmpty } from '../../../src/lib/functions';
import { PlayerPlacement } from '../../../src/types/types';

type PlayerMatchVariant = Omit<
  PlayerMatch,
  'championId' | 'matchId' | 'playerId' | 'cs'
> & {
  match: {
    playerMatches: PlayerMatch[];
    winside: Side;
    game: {
      stage: Stage;
    };
  };
};

export function getPlayerPlacement(
  playerMatches: PlayerMatchVariant[],
  playerId: number
): PlayerPlacement {
  const placement = playerMatches
    .map((pm) => {
      const self = pm.match.playerMatches.find(
        (pm) => pm.playerId === playerId
      );

      if (!self) {
        return null;
      }

      return {
        stageId: pm.match.game.stage.id,
        stageName: pm.match.game.stage.name ?? '',
        didWin: self.side === pm.match.winside,
      };
    })
    .filter(notEmpty);

  const indexOfMaxStage = Math.max(...placement.map((p) => p.stageId));
  const finalPlacement = placement.find((p) => p.stageId === indexOfMaxStage);

  if (!finalPlacement) {
    return 'Uczestnik';
  }

  return getLabel(finalPlacement.stageName, finalPlacement.didWin);
}

function getLabel(stageName: string, isWinner: boolean) {
  switch (stageName) {
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
