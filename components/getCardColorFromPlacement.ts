import { PlayerPlacement } from '../types/types';

export function getCardColorFromPlacement(placement: PlayerPlacement) {
  const colors = {
    cardBg: 'bg-slate-500',
    placementBg: 'bg-slate-300',
    placementBorder: 'border-slate-800',
    dataBg: 'bg-slate-300',
    dataBorder: 'border-slate-800',
    infoBg: 'bg-slate-300',
    infoBorder: 'border-slate-800',
    dataBgTextColor: 'text-slate-600',
  };

  function setColors(
    cardBg: string,
    placementBg: string,
    placementBorder: string,
    dataBg: string,
    dataBorder: string,
    infoBg: string,
    infoBorder: string,
    dataBgTextColor: string
  ) {
    colors.cardBg = cardBg;
    colors.dataBg = dataBg;
    colors.dataBorder = dataBorder;
    colors.infoBg = infoBg;
    colors.infoBorder = infoBorder;
    colors.placementBg = placementBg;
    colors.placementBorder = placementBorder;
    colors.dataBgTextColor = dataBgTextColor;
  }

  switch (placement) {
    case 'Zwycięzca':
      setColors(
        'bg-yellow-600',
        'bg-yellow-300',
        'border-stone-900',
        'bg-yellow-300',
        'border-stone-900',
        'bg-yellow-300',
        'border-stone-900',
        'text-yellow-50'
      );
      break;
    case 'Wicemistrz':
      setColors(
        'bg-gray-400',
        'bg-gray-300',
        'border-stone-900',
        'bg-gray-300',
        'border-stone-900',
        'bg-gray-300',
        'border-stone-900',
        'text-gray-400'
      );
      break;
    case 'Trzecie miejsce':
      setColors(
        'bg-orange-900',
        'bg-orange-400',
        'border-stone-900',
        'bg-orange-300',
        'border-stone-900',
        'bg-orange-400',
        'border-stone-900',
        'text-orange-500'
      );
      break;
    case 'Czwarte miejsce':
      setColors(
        'bg-blue-900',
        'bg-blue-400',
        'border-stone-900',
        'bg-blue-300',
        'border-stone-900',
        'bg-blue-400',
        'border-stone-900',
        'text-blue-500'
      );
      break;
    case 'Ćwierćfinalista':
      setColors(
        'bg-green-700',
        'bg-green-500',
        'border-stone-900',
        'bg-green-400',
        'border-stone-900',
        'bg-green-500',
        'border-stone-900',
        'text-green-600'
      );
      break;
    case '1/8 finałów':
      setColors(
        'bg-violet-400',
        'bg-violet-200',
        'border-stone-900',
        'bg-violet-100',
        'border-stone-900',
        'bg-violet-200',
        'border-stone-900',
        'text-violet-300'
      );
      break;
    case '1/16 finałów':
      setColors(
        'bg-red-900',
        'bg-red-400',
        'border-stone-900',
        'bg-red-300',
        'border-stone-900',
        'bg-red-400',
        'border-stone-900',
        'text-red-500'
      );
      break;
  }

  return colors;
}
