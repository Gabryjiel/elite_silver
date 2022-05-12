import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import { BreadcrumbsLink } from '../../components/layout/Breadcrumbs/Breadcrumbs';
import Header from '../../components/layout/Header';
import Wrapper from '../../components/layout/Wrapper';
import TournamentList from '../../components/tournaments/TournamentList';
import { getTournaments } from '../../prisma/queries';
import { TournamentIndexDTO } from '../../types/tournament.dto';

interface Props {
  breadcrumbsLinks: BreadcrumbsLink[];
  tournaments: TournamentIndexDTO[];
}

export default function Tournaments(props: Props) {
  return (
    <>
      <Head>
        <title>Elite Silver - Turnieje</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <Header />
        <Breadcrumbs links={props.breadcrumbsLinks} />
        <div className="flex flex-grow flex-col p-4">
          <TournamentList tournaments={props.tournaments} />
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
