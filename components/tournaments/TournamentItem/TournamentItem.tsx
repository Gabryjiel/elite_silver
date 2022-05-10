import Link from 'next/link';
import Image from 'next/image';
import { TournamentIndexDTO } from '../../../types/tournament.dto';
import cloudJpg from '../../../public/images/clouds.jpg';

interface TournamentItemProps {
  tournament: TournamentIndexDTO;
}

export function TournamentItem({ tournament }: TournamentItemProps) {
  return (
    <Link href={`/tournaments/${tournament.id}`} passHref>
      <a className="my-12 flex h-96 w-72 cursor-pointer flex-col rounded-md bg-stone-700 hover:text-stone-900">
        <div className="relative h-1/2 w-full bg-black">
          <Image
            layout="fill"
            objectFit="cover"
            src={cloudJpg}
            alt={tournament.name}
          />
        </div>
        <div className="flex flex-grow flex-col justify-between pt-1 indent-1 text-4xl">
          <span>{tournament.name}</span>
          <div className="mb-2 ml-2 flex h-16 flex-col text-2xl">
            <span>Graczy {tournament.playerCount}</span>
            <span>Meczy {tournament.matchCount}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
