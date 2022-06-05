import { Side, Waywin } from '@prisma/client';
import TowerSrc from '../public/images/big-towers.png';
import SwordSrc from '../public/images/sword.png';
import CsSrc from '../public/images/100.png';
import FlagSrc from '../public/images/flag.png';

function mapName(championName: string) {
  switch (championName) {
    case 'Tahm Kench':
      return 'TahmKench';
    case 'Lee Sin':
      return 'LeeSin';
    default:
      return championName
        .toLowerCase()
        .replace(/[ ']/g, '')
        .replace(/./, (c) => c.toUpperCase());
  }
}

export function getSplash(championName?: string) {
  if (!championName) {
    return 'http://placehold.jp/000000/00ff00/1280x720.jpg?text=404';
  }

  return `http://ddragon.leagueoflegends.com/cdn/img/champion/centered/${mapName(
    championName
  )}_0.jpg`;
}

export function getLoading(championName?: string) {
  if (!championName) {
    return 'http://placehold.jp/000000/00ff00/308x560.jpg?text=404';
  }

  return `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${mapName(
    championName
  )}_0.jpg`;
}

export function getIcon(championName: string, side?: Side) {
  if (!championName) {
    return side === 'BLUE'
      ? 'http://placehold.jp/64/000000/0000ff/150x150.jpg?text=%3F'
      : 'http://placehold.jp/64/000000/ff0000/150x150.jpg?text=%3F';
  }

  return `http://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${mapName(
    championName
  )}.png`;
}

export function getWaywinIcon(waywin: Waywin) {
  switch (waywin) {
    case 'CS':
      return CsSrc;
    case 'TOWER':
      return TowerSrc;
    case 'SURRENDER':
      return FlagSrc;
    case 'KILL':
    default:
      return SwordSrc;
  }
}
