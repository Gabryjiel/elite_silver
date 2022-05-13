import Head from 'next/head';
import TournamentNavigation from '../../../components/tournaments/TournamentNavigation';
import Wrapper from '../../../components/layout/Wrapper';
import { pluckTournamentIds, getTournament } from '../../../prisma/queries';
import { GetStaticPaths, GetStaticProps } from 'next';
import { TournamentDTO } from '../../../types/dtos';
import { mapToTournamentDTO } from '../../../prisma/dtos/mapToTournamentDTO';
import { BreadcrumbsLink } from '../../../components/layout/Breadcrumbs/Breadcrumbs';
import Breadcrumbs from '../../../components/layout/Breadcrumbs';
import Header from '../../../components/layout/Header';

type Paths = {
  id: string;
};

interface Props {
  breadcrumbsLinks: BreadcrumbsLink[];
  tournament: TournamentDTO;
}

export default function TournamentMatches(props: Props) {
  return (
    <>
      <Head>
        <title>Elite Silver - {props.tournament.name} - MEcze</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <Header />
        <Breadcrumbs links={props.breadcrumbsLinks} />

        <TournamentNavigation
          tournamentId={props.tournament.id}
          name={props.tournament.name}
          winner={'Hauche'}
        />
      </Wrapper>
    </>
  );
}

export const getStaticPaths: GetStaticPaths<Paths> = async () => {
  const tournaments = await pluckTournamentIds();

  return {
    fallback: false,
    paths: tournaments.map(({ id }) => ({
      params: {
        id: id.toString(),
      },
    })),
  };
};

export const getStaticProps: GetStaticProps<Props, Paths> = async (context) => {
  const tournamentId = parseInt(context.params?.id ?? '0');
  const tournament = await getTournament(tournamentId);

  if (tournament == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tournament: mapToTournamentDTO(tournament),
      breadcrumbsLinks: [
        { label: 'Strona główna', href: '/' },
        { label: 'Turnieje', href: '/tournaments' },
        { label: tournament.name, href: `/tournaments/${tournament.id}` },
      ],
    },
  };
};
