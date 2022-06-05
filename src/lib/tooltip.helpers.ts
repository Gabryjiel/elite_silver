import { Waywin } from '@prisma/client';

export function getWaywinTooltip(waywin: Waywin) {
  switch (waywin) {
    case 'CS':
      return 'Wygrana przez zabicie 100 minioów';
    case 'TOWER':
      return 'Wygrana przez zniszczenie wieży';
    case 'SURRENDER':
      return 'Wygrana walkowerem';
    case 'KILL':
    default:
      return 'Wygrana przez zabicie przeciwnika';
  }
}
