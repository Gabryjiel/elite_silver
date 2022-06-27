import Image from 'next/image';

import { PlayerCardInfo } from '../../../prisma/queries';
import { getSplash } from '../../lib/image.helpers';
import { getCardColorFromPlacement } from './getCardColorFromPlacement';
import { getRankEmblem } from './getRankEmblem';
import { PlayerCardTrophy } from './Trophy';

type Props = {
  cardInfo: PlayerCardInfo;
};

export function PlayerCard({ cardInfo }: Props) {
  const colors = getCardColorFromPlacement(cardInfo.placement);
  const [splashChampion] = cardInfo.champions;
  const splashArt = getSplash(splashChampion?.name ?? '');
  const rankSrc = getRankEmblem(cardInfo?.rankName);

  return (
    <div
      className={`relative flex aspect-card h-full flex-col items-center rounded-xl border-8 border-black ${colors.cardBg}`}
    >
      <div
        data-role="banner-bg"
        className="flag-bg absolute -top-2 right-2 z-10 flex bg-yellow-100"
      >
        <div data-role="banner" className="flag z-10 flex bg-indigo-800"></div>
      </div>
      <div
        data-role="username"
        className={`flex h-1/12 w-full items-end justify-center px-1 pt-2`}
      >
        <div
          className={`flex h-full w-full items-center rounded-xl border-2 ${colors.infoBg} ${colors.infoBorder}`}
        >
          <div className="relative aspect-square h-full">
            <Image
              layout="fill"
              objectFit="contain"
              alt={cardInfo?.rankName ?? ''}
              src={rankSrc}
            />
          </div>
          <div>
            <span className="ml-1 font-imfell text-3xl">
              {cardInfo.playerName}
            </span>
          </div>
        </div>
      </div>
      <div
        data-role="picture"
        className="rounded-top-xl relative h-5/12 w-11/12 border-2 border-y-0 border-black bg-gray-300"
      >
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={splashChampion?.name ?? ''}
          src={splashArt}
        />
      </div>
      <div className={`h-1/12 w-full px-2 pb-3`}>
        <div
          className={`flex h-full w-full items-center rounded-md border-2 pl-1 ${colors.placementBg} ${colors.placementBorder}`}
        >
          <PlayerCardTrophy placement={cardInfo.placement} />
          <span className="ml-1 font-imfell text-2xl">
            {cardInfo.placement}
          </span>
        </div>
      </div>
      <div data-role="infoBox" className="w-full flex-1 px-3">
        <div
          className={`relative flex h-full w-full flex-col flex-wrap justify-start gap-1 self-start rounded-md border-2 p-2 shadow-xl ${colors.dataBg} ${colors.dataBorder}`}
        >
          <div className="grid h-full w-full auto-cols-auto grid-flow-col grid-rows-3 pl-1 opacity-60">
            {cardInfo.champions.map((champion) => (
              <div
                key={`card-${cardInfo.playerId}-${champion.id}`}
                className="z-20 flex items-center justify-start gap-1"
              >
                <div className="relative aspect-square h-14 w-14 overflow-clip rounded-full border-2 border-black text-center">
                  <Image
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    alt={champion.name}
                    src={champion.icon}
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-2xl">{champion.wins}</span>
                  <span className="text-2xl">/</span>
                  <span className="text-2xl">{champion.loses}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div data-role="footer" className="relative h-8 w-full">
        <div className="flex h-full w-full items-center justify-start">
          <span className="ml-4 indent-1 font-mono text-lg">
            {cardInfo.tournamentName}
          </span>
        </div>
        <div
          className={`absolute -top-6 right-2 flex h-12 w-28 items-center justify-center gap-1 rounded-md border-2 text-2xl font-bold ${colors.infoBg} ${colors.infoBorder}`}
        >
          <span className="text-green-900">{cardInfo.wins}</span>
          <span>/</span>
          <span className="text-red-900">{cardInfo.loses}</span>
        </div>
      </div>
    </div>
  );
}
