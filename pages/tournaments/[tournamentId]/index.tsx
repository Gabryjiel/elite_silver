import Head from 'next/head';
import TournamentNavigation from '../../../src/tournaments/TournamentNavigation';
import Wrapper from '../../../src/layout/Wrapper';
import { getTournamentParams } from '../../../src/helpers/params/getTournamentParams';

export default function TournamentIndex(props: any) {
  return (
    <Wrapper>
      <Head>
        <title>Prokrastynatorzy - {props.tournament.name}</title>
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
