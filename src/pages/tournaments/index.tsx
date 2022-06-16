import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import { useState } from 'react';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { BreadcrumbsLink } from '../../components/layout/Breadcrumbs/Breadcrumbs';
import { Header } from '../../components/layout/Header';
import { Wrapper } from '../../components/layout/Wrapper';
import { TournamentItem } from '../../components/tournaments/TournamentItem';
import { getTournaments } from '../../../prisma/queries';
import { TournamentIndexDTO } from '../../types/tournament.dto';

interface Props {
  breadcrumbsLinks: BreadcrumbsLink[];
  tournaments: TournamentIndexDTO[];
}

export default function Tournaments(props: Props) {
  const [search, setSearch] = useState('');

  const onSeachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filtered = props.tournaments.filter((tournament) =>
    tournament.name.includes(search)
  );

  return (
    <>
      <Head>
        <title>ES - Turnieje</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <Header />
        <Breadcrumbs links={props.breadcrumbsLinks} />
        <div className="flex flex-grow flex-col overflow-hidden p-4">
          <div className="flex h-24 w-full items-center justify-between pt-4 sm:px-1 lg:px-32 2xl:px-32">
            <span className="text-6xl font-bold text-stone-300">Turnieje</span>
            <input
              className="h-12 w-64 rounded-md bg-stone-500 py-2 indent-4 text-2xl text-stone-900 outline-none outline-double placeholder:text-stone-800 focus-visible:outline-8 focus-visible:outline-stone-800"
              type="text"
              placeholder="Szukaj"
              value={search}
              onChange={onSeachChange}
            />
          </div>
          <div
            id="tournament-container"
            className="mt-12 grid place-items-center gap-y-12 overflow-y-auto px-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          >
            {filtered.map((tournament) => (
              <TournamentItem key={tournament.name} tournament={tournament} />
            ))}
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tournaments = await getTournaments();
  const breadcrumbsLinks = [
    { label: 'Strona główna', href: '/' },
    { label: 'Turnieje', href: '/tournaments' },
  ];

  return {
    props: {
      tournaments,
      breadcrumbsLinks,
    },
  };
};