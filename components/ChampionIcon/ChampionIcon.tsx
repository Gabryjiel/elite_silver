import Link from 'next/link';
import Image from 'next/image';
import { getIcon } from '../../lib/image.helpers';
import { Side } from '@prisma/client';

interface Props {
  href: string;
  side: Side;
  championName: string;
  grayscaled?: boolean;
}

export function ChampionIcon(props: Props) {
  const side = props.side === 'BLUE' ? 'border-blue-900' : 'border-red-900';
  const icon = getIcon(props.championName);
  const grayscaled = props.grayscaled ? 'grayscale' : '';

  return (
    <Link href={props.href} passHref>
      <a>
        <div className={`relative h-16 w-16 cursor-pointer border-2 ${side}`}>
          <Image
            src={icon}
            alt={props.championName}
            title={props.championName}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className={grayscaled}
          />
        </div>
      </a>
    </Link>
  );
}
