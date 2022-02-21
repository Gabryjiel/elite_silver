import Head from 'next/head';
import TournamentNavigation from '../../../components/tournaments/TournamentNavigation';
import Wrapper from '../../../components/layout/Wrapper';
import { getTournamentParams } from '../../../lib/getTournamentParams';

export default function TournamentSchema(props: any) {
  return (
    <Wrapper>
      <Head>
        <title>Prokrastynatorzy - {props.tournament.name} - Drabinka</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TournamentNavigation
        tournamentId={props.tournament.tournamentId}
        name={props.tournament.name}
        winner={'Hauche'}
      />
    </Wrapper>
  );
}

export async function getStaticPaths() {
  return getTournamentParams();
}

export async function getStaticProps({ params }: any) {
  return {
    props: {
      tournament: {
        tournamentId: params.tournamentId,
        name: 'Elite Bronze',
      },
    },
  };
}
