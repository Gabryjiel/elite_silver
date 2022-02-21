import Head from 'next/head';
import Image from 'next/image';
import Wrapper from '../../components/layout/Wrapper';
import cloudJpg from '../../public/images/clouds.jpg';
import Link from 'next/link';
import { getTournaments } from '../../prisma/queries/tournaments';
import { TournamentIndexDTO } from '../../types/tournament.dto';

interface TournamentItemProps {
  tournament: TournamentIndexDTO;
}

const TournamentItem = ({ tournament }: TournamentItemProps) => (
  <Link href={`/tournaments/${tournament.id}`} passHref>
    <a className="my-12 flex h-96 w-72 cursor-pointer flex-col rounded-md bg-stone-700 hover:text-stone-900">
      <div className="relative h-1/2 w-full bg-black">
        <Image
          layout="fill"
          objectFit="cover"
          src={cloudJpg}
          alt={tournament.name}
        />
      </div>
      <div className="flex flex-grow flex-col justify-between pt-1 indent-1 text-4xl">
        <span>{tournament.name}</span>
        <div className="mb-2 ml-2 flex h-16 flex-col text-2xl">
          <span>Graczy {tournament.playerCount}</span>
          <span>Meczy {tournament.matchCount}</span>
        </div>
      </div>
    </a>
  </Link>
);

interface TournamentsPageProps {
  tournaments: TournamentIndexDTO[];
}

export default function Tournaments(props: TournamentsPageProps) {
  return (
    <>
      <Head>
        <title>Prokrastynatorzy - Turnieje</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <div className="flex flex-grow">
          <div className="flex min-h-screen max-w-full flex-grow flex-col">
            <div className="flex h-64 w-full justify-between px-8">
              <span className="grid h-full place-items-center indent-24 text-4xl text-stone-300">
                Turnieje
              </span>
              <div className="flex h-full items-center">
                <input
                  className="scroll h-12 w-full rounded-md bg-stone-500 indent-4 text-2xl text-stone-900 outline-none outline-double placeholder:text-stone-800 focus-visible:outline-8 focus-visible:outline-stone-800"
                  type="text"
                  placeholder="Szukaj"
                />
              </div>
            </div>
            <div className="grid w-full max-w-full grid-cols-card-20 justify-evenly overflow-y-auto px-32">
              {props.tournaments.map((tournament) => (
                <TournamentItem key={tournament.name} tournament={tournament} />
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export async function getStaticProps() {
  const tournaments = await getTournaments();

  return {
    props: {
      tournaments,
    },
  };
}
