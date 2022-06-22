import { Dispatch, SetStateAction, useEffect } from 'react';
import { PlayerCardInfo } from '../../../prisma/queries';
import { FaRegDotCircle, BsCircle } from '../icons';
import { PlayerCard } from '../PlayerCard';

type Props = {
  cardInfos: PlayerCardInfo[];
  visibleCard: number;
  setVisibleCard: Dispatch<SetStateAction<number>>;
  getPreviousCard: () => void;
  getNextCard: () => void;
};

export function usePlayerCardHolder(
  cardInfosLength: number,
  setVisibleCard: Dispatch<SetStateAction<number>>
) {
  const getNextCard = () => {
    setVisibleCard((prev) => {
      const value = (prev + 1) % cardInfosLength;

      return value;
    });
  };

  const getPreviousCard = () => {
    setVisibleCard((prev) => {
      const value = prev === 0 ? cardInfosLength - 1 : prev - 1;
      return value;
    });
  };

  return {
    getPreviousCard,
    getNextCard,
  };
}

export function PlayerCardHolder({
  cardInfos,
  visibleCard,
  getNextCard,
  getPreviousCard,
  setVisibleCard,
}: Props) {
  const cardIndex = visibleCard % cardInfos.length;
  const cardInfo = cardInfos[cardIndex];

  useEffect(() => {
    return () => {
      setVisibleCard(0);
    };
  }, [setVisibleCard]);

  return (
    <div
      data-role="card-holder"
      className="flex w-1/3 flex-col items-center justify-around p-2"
    >
      <div className="aspect-card h-10/12">
        <PlayerCard cardInfo={cardInfo} />
      </div>
      <div className="flex h-1/12 w-full items-center justify-around p-1">
        <button
          onClick={getPreviousCard}
          className="h-12 w-12 rounded-xl border-2 border-stone-500 bg-stone-400 hover:border-stone-300"
        >
          {'<<'}
        </button>
        <div className="flex h-full items-center justify-center gap-2 text-stone-300">
          {cardInfos.map((item, index) => {
            const key = `dot-${item.tournamentName}`;

            if (index === cardIndex) {
              return (
                <FaRegDotCircle
                  key={key + 'active'}
                  height="1.5em"
                  width="1.5em"
                />
              );
            }

            return (
              <BsCircle
                key={key}
                onClick={() => setVisibleCard(index)}
                className="cursor-pointer hover:fill-stone-100"
                height="1.5em"
                width="1.5em"
              />
            );
          })}
        </div>
        <button
          onClick={getNextCard}
          className="h-12 w-12 rounded-xl border-2 border-stone-500 bg-stone-400 hover:border-stone-300"
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
}
