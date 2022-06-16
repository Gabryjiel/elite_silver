import Link from 'next/link';
import Image from 'next/image';
import cloudJpg from '../../../public/images/clouds.jpg';
import { TournamentIndexDTO } from '../../../types/tournament.dto';
import { MdGroup, GiDuel } from '../../icons';
interface Props {
  tournament: TournamentIndexDTO;
}

export function TournamentItem({ tournament }: Props) {
  return (
    <Link href={`/tournaments/${tournament.id}`} passHref>
      <a className="flex h-64 w-64 cursor-pointer flex-col overflow-hidden rounded-3xl bg-stone-700">
        <div className="relative h-1/2 w-full bg-black">
          <Image
            layout="fill"
            objectFit="cover"
            src={cloudJpg}
            alt={tournament.name}
          />
        </div>
        <div className="flex flex-grow flex-col justify-between pt-1 indent-1">
          <div className="mt-2 w-full">
            <span className="ml-2 text-2xl font-semibold text-stone-300">
              {tournament.name}
            </span>
          </div>
          <div className="mb-4 ml-4 flex h-8 gap-2 text-lg">
            <Link href={`/tournaments/${tournament.id}/players`} passHref>
              <a className="flex w-16 items-center justify-center rounded-lg border-2 border-stone-500 text-stone-300 hover:border-stone-200">
                <MdGroup />
                <span>{tournament.playerCount}</span>
              </a>
            </Link>
            <Link href={`/tournaments/${tournament.id}/matches`} passHref>
              <a className="flex w-16 items-center justify-center rounded-lg border-2 border-stone-500 text-stone-300 hover:border-stone-200">
                <GiDuel />
                <span>{tournament.matchCount}</span>
              </a>
            </Link>
          </div>
        </div>
      </a>
    </Link>
  );
}
