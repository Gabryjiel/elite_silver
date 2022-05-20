import Image from 'next/image';
import Link from 'next/link';
import { getLoading, getIcon, getWaywinIcon } from '../../lib/image.helpers';

import { GetMatchesFromTournamentT } from '../../prisma/queries';
import { ArrayElement } from '../../types/utils';

interface Props {
  match: ArrayElement<GetMatchesFromTournamentT>;
}

export function MatchDisplay(props: Props) {
  const match = props.match;
  const pm0 = match.playerMatches.at(0);
  const pm1 = match.playerMatches.at(1);

  if (!pm0 || !pm1) {
    return null;
  }

  const p0Won = pm0.side === match.winside;
  const p1Won = pm1.side === match.winside;

  return (
    <div className="flex h-full px-4">
      <div id="player-1" className="h-full w-2/5">
        <div className="h-1/12 w-full text-center text-4xl font-bold text-stone-300">
          <Link href={`/players/${pm0.player.name}`} passHref>
            <a>{pm0.player.name}</a>
          </Link>
        </div>
        <div id="loading-1" className="relative h-9/12 w-full">
          <Image
            src={getLoading(pm0.champion?.name)}
            alt={pm0.champion?.name}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </div>
        <div
          id="bans-1"
          className="flex h-2/12 w-full justify-center gap-4 pt-4"
        >
          {pm0.bans.map((ban) => {
            return (
              <div key={`ban-${ban.id}`} className="h-full w-1/6">
                <div className="relative h-full">
                  <Image
                    src={getIcon(ban.champion.name, pm0.side)}
                    alt={ban.champion.name}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    className="grayscale"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div id="match-details" className="h-full w-1/5">
        <div className="flex h-1/2 w-full items-center justify-between text-5xl text-stone-300">
          <span
            className={`w-1/3 text-center text-7xl ${
              p0Won ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            {p0Won ? 'W' : 'L'}
          </span>
          <span className="relative h-1/4 w-1/3 text-3xl">
            <Image
              src={getWaywinIcon(match.waywin)}
              alt="Waywin"
              layout="fill"
              objectFit="contain"
              className="contrast-50 invert"
            />
          </span>
          <span
            className={`w-1/3 text-center text-7xl ${
              p1Won ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            {p1Won ? 'W' : 'L'}
          </span>
        </div>
        <div className="h-1/2 w-full text-4xl">
          <div className="grid place-items-center text-stone-300">
            {match.stage.name}
          </div>
        </div>
      </div>

      <div id="player-2" className="h-full w-2/5">
        <div className="h-1/12 w-full text-center text-4xl font-bold text-stone-300">
          <Link href={`/players/${pm1.player.name}`} passHref>
            <a>{pm1.player.name}</a>
          </Link>
        </div>
        <div id="loading-2" className="relative h-9/12 w-full">
          <Image
            src={getLoading(pm1.champion?.name)}
            alt={pm1.champion?.name}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </div>
        <div
          id="bans-2"
          className="flex h-2/12 w-full justify-center gap-4 pt-4"
        >
          {pm1.bans.map((ban) => {
            return (
              <div key={`ban-${ban.id}`} className="h-full w-1/6">
                <div className="relative h-full">
                  <Image
                    src={getIcon(ban.champion.name, pm1.side)}
                    alt={ban.champion.name}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    className="grayscale"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
