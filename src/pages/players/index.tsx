import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import { useState } from 'react';
import { getUsers } from '../../../prisma/queries';
import { BreadcrumbsLink } from '../../components/layout/Breadcrumbs/Breadcrumbs';
import { Header } from '../../components/layout/Header';
import { Wrapper } from '../../components/layout/Wrapper';
import { UserCard } from '../../components/UserCard';

interface Props {
  breadcrumbsLinks: BreadcrumbsLink[];
  users: Awaited<ReturnType<typeof getUsers>>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const breadcrumbsLinks = [
    { label: 'Strona główna', href: '/' },
    { label: 'Zawodnicy', href: '/stats' },
  ];
  const users = await getUsers();

  return {
    props: {
      breadcrumbsLinks,
      users,
    },
  };
};

export default function Players(props: Props) {
  const [search, setSearch] = useState('');

  const onSeachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filtered = props.users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>ES - Gracze</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <Header />

        <div className="flex flex-1 flex-col overflow-hidden px-4">
          <div className="flex h-24 w-full items-center justify-between pt-4 sm:px-1 lg:px-32 2xl:px-32">
            <span className="text-6xl font-bold text-stone-300">Gracze</span>
            <input
              className="h-12 w-64 rounded-md bg-stone-500 py-2 indent-4 text-2xl text-stone-900 outline-none outline-double placeholder:text-stone-800 focus-visible:outline-8 focus-visible:outline-stone-800"
              type="text"
              placeholder="Szukaj"
              value={search}
              onChange={onSeachChange}
            />
          </div>

          <div
            className="mt-12 grid flex-1 place-items-start gap-y-12 overflow-y-auto px-12 py-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            style={{ scrollbarGutter: 'stable both-edges' }}
          >
            {filtered.map((user) => {
              return (
                <UserCard
                  key={`UserCard-${user.id}`}
                  id={user.id}
                  name={user.name}
                  matchCount={user.matchCount}
                  tournamentCount={user.tournamentCount}
                  splashArt={user.favouriteChampionSplashArt}
                  trophies={user.trophies}
                />
              );
            })}
          </div>
        </div>
      </Wrapper>
    </>
  );
}
