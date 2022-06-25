import { useRouter } from 'next/router';
import { useState } from 'react';
import { getUserById, PlayerCardInfo } from '../../../../prisma/queries';
import { BrowserWrapper } from '../../layout/BrowserWrapper';
import { MobileWrapper } from '../../layout/MobileWrapper';
import { PageHeader } from '../../layout/PageHeader';
import { PlayerCardHolder, usePlayerCardHolder } from '../../PlayerCardHolder';

type Props = {
  children: JSX.Element;
  user: Awaited<ReturnType<typeof getUserById>>;
  cardInfos: PlayerCardInfo[];
};

export const PlayerPageLayout = (props: Props) => {
  const router = useRouter();
  const id = props.user?.id;

  const [visibleCard, setVisibleCard] = useState(0);
  const { getNextCard, getPreviousCard } = usePlayerCardHolder(
    props.cardInfos.length,
    setVisibleCard
  );

  return (
    <>
      <BrowserWrapper>
        <PageHeader
          text={props.user?.name ?? 'Zawodnik'}
          asPath={router.asPath}
          navLinks={[
            { href: `/players/${id}`, label: 'Statystyki' },
            {
              href: `/players/${id}/champions`,
              label: 'Bohaterowie',
            },
            {
              href: `/players/${id}/opponents`,
              label: 'Przeciwnicy',
            },
          ]}
        />
        <div id="container" className="flex flex-1 overflow-hidden">
          <PlayerCardHolder
            cardInfos={props.cardInfos}
            getNextCard={getNextCard}
            getPreviousCard={getPreviousCard}
            setVisibleCard={setVisibleCard}
            visibleCard={visibleCard}
          />
          <div id="dashboard" className="flex h-full flex-1 p-2 text-stone-200">
            {props.children}
          </div>
        </div>
      </BrowserWrapper>

      <MobileWrapper></MobileWrapper>
    </>
  );
};
