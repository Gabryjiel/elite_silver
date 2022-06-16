import Link from 'next/link';
import Image from 'next/image';
import { AFillTrophy, GiDuel } from '../icons';
import { Trophy } from '../../types/types';

interface Props {
  id: number;
  name: string;
  tournamentCount: number;
  matchCount: number;
  splashArt: string;
  trophies: Trophy[];
}

const fillTrophyMap = new Map([
  [1, 'gold'],
  [2, 'silver'],
  [3, 'chocolate'],
]);

export function UserCard({
  id,
  matchCount,
  name,
  tournamentCount,
  splashArt,
  trophies,
}: Props) {
  return (
    <Link href={`/players/${id}`} passHref>
      <a className="relative flex h-60 w-64 cursor-pointer flex-col overflow-hidden rounded-3xl bg-stone-700 transition-all ease-out hover:outline hover:outline-2 hover:outline-stone-700">
        <div className="relative h-32 w-full bg-black">
          <Image layout="fill" objectFit="cover" src={splashArt} alt={name} />
        </div>
        <div className="absolute top-24 right-2 flex h-8">
          {trophies.map((trophy) => {
            const fill = fillTrophyMap.get(trophy.place);

            if (fill) {
              return (
                <div title={trophy.tournament.name}>
                  <AFillTrophy
                    fill={fill}
                    height="3rem"
                    width="3rem"
                    strokeWidth="0.5rem"
                    stroke="black"
                    className="transition-all ease-out hover:brightness-110"
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
        <div className="flex flex-grow flex-col justify-between pt-1 indent-1">
          <div className="mt-2 w-full">
            <span className="ml-2 text-2xl font-semibold text-stone-300">
              {name}
            </span>
          </div>
          <div className="ml-4 mb-4 flex w-full justify-start gap-2 text-lg">
            <Link href={`/players/${id}/tournaments`} passHref>
              <a className="flex w-16 items-center justify-center rounded-lg border-2 border-stone-500 text-stone-300 hover:border-stone-200">
                <AFillTrophy />
                <span>{tournamentCount}</span>
              </a>
            </Link>
            <Link href={`/players/${id}/matches`} passHref>
              <a className="flex w-16 items-center justify-center rounded-lg border-2 border-stone-500 text-stone-300 hover:border-stone-200">
                <GiDuel />
                <span>{matchCount}</span>
              </a>
            </Link>
            <div className="flex w-16 items-center justify-center rounded-lg border-2 border-stone-500 text-stone-300">
              <span>0</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
