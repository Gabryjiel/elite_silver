import Image from 'next/image';
import { getCardColorFromPlacement } from './getCardColorFromPlacement';
import { getSplash } from '../../lib/image.helpers';
import { ReturnPlayer } from '../../../prisma/queries';

type PlayerCardProps = {
  tournamentName: string;
  player: ReturnPlayer;
};

export function PlayerCard(props: PlayerCardProps) {
  const colors = getCardColorFromPlacement(props.player.placement);
  const championName = props.player.champions.at(0)?.name ?? '';
  const splashArt = getSplash(championName);

  return (
    <div
      className={`relative flex aspect-card h-full flex-col items-center rounded-xl border-8  border-black py-3 ${colors.cardBg}`}
    >
      <div className="mb-1 flex h-1/12 w-full items-center justify-center text-2xl">
        <span className="font-serif font-bold">{props.player.name}</span>
      </div>
      <div className="rounded-top-xl relative h-3/5 w-11/12 border-2 border-black bg-gray-300">
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={championName}
          src={splashArt}
        />
      </div>
      <div className="relative h-5 w-full">
        <div
          className={`absolute -top-6 z-10 ml-2 w-2/3 rounded-md border-2 pl-3 ${colors.placementBg} ${colors.placementBorder}`}
        >
          {props.player.placement}
        </div>
      </div>
      <div
        className={`relative flex h-2/6 w-11/12 flex-col flex-wrap justify-start gap-1 overflow-hidden rounded-md border-2 p-2 pt-1 pl-2 shadow-xl ${colors.dataBg} ${colors.dataBorder}`}
      >
        <div
          className={`absolute z-10 -ml-2 -mt-2 grid h-full w-full place-items-center text-center text-4xl font-extrabold opacity-40 ${colors.dataBgTextColor}`}
        >
          {props.tournamentName}
        </div>
        {props.player.champions.map((champion) => (
          <div
            key={`card-${props.player.id}-${champion.id}`}
            className="z-20 flex gap-3 text-lg"
          >
            <div
              className={`aspect-square rounded-full border-2 border-slate-800 bg-slate-300 text-center font-mono text-sm ${colors.placementBg}`}
            >
              {champion.count}
            </div>
            <div className="flex items-center text-sm font-semibold">
              {champion.name}
            </div>
          </div>
        ))}
      </div>
      <div
        className={`absolute bottom-1 mr-8 w-16 self-end rounded-md border-2 text-center text-sm font-bold ${colors.infoBg} ${colors.infoBorder}`}
      >
        {`${props.player.record}`}
      </div>
    </div>
  );
}
