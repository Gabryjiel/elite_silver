import { Waywin } from '@prisma/client';
import TowerSrc from '../images/big-towers.png';
import SwordSrc from '../images/sword.png';
import CsSrc from '../images/100.png';
import FlagSrc from '../images/flag.png';

function mapName(championName: string) {
  return championName.replace(/[ ']/g, '');
}

export function getSplash(championName: string) {
  return `http://ddragon.leagueoflegends.com/cdn/img/champion/centered/${mapName(
    championName
  )}_0.jpg`;
}

export function getIcon(championName: string) {
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
