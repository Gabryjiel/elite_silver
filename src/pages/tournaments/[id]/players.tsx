import Head from 'next/head';
import Image from 'next/image';
import { TournamentNavigation } from '../../../components/tournaments/TournamentNavigation';
import { Wrapper } from '../../../components/layout/Wrapper';
import {
  getPlayersFromTournament,
  getTournament,
  pluckTournamentIds,
  ReturnPlayer,
} from '../../../../prisma/queries';
import { useState } from 'react';
import Link from 'next/link';
import { getWaywinIcon } from '../../../lib/image.helpers';
import { getWaywinTooltip } from '../../../lib/tooltip.helpers';
import { PlayerCard } from '../../../components/PlayerCard/PlayerCard';
import { GetStaticPaths, GetStaticProps } from 'next';
import { TournamentDTO } from '../../../types/dtos';
import { mapToTournamentDTO } from '../../../../prisma/dtos/mapToTournamentDTO';
import { Header } from '../../../components/layout/Header';
import { SearchBox } from '../../../components/SearchBox';
import { SearchPlayerItem } from '../../../components/SearchPlayerItem';
import { ChampionIcon } from '../../../components/ChampionIcon';

type Paths = {
  id: string;
};

interface Props {
  tournament: TournamentDTO;
  players: ReturnPlayer[];
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
  const players = await getPlayersFromTournament(tournamentId);

  if (tournament == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tournament: mapToTournamentDTO(tournament),
      players,
    },
  };
};

export default function TournamentPlayers(props: Props) {
  const [player, setPlayer] = useState<ReturnPlayer | null>(null);
  const [search, setSearch] = useState('');

  const players = props.players.filter((p) =>
    p.name?.toLowerCase()?.includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>ES - {props.tournament.name} - Zawodnicy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <Header />
        <div className="flex w-full flex-grow flex-col justify-center overflow-hidden">
          <TournamentNavigation
            tournamentId={props.tournament.id}
            name={props.tournament.name}
            winner={'Hauche'}
          />

          <div className="flex h-full max-h-full gap-12 overflow-hidden pb-2">
            <div className="flex h-full max-h-full w-2/6 flex-col justify-between px-12">
              <SearchBox search={search} setSearch={setSearch} />
              <div className="mt-8 flex flex-1 flex-col gap-4 overflow-y-auto pr-4">
                {players.map((player, idx) => (
                  <SearchPlayerItem
                    key={`SearchPlayerItem-${player.name}`}
                    name={player.name ?? ''}
                    tabIndex={idx}
                    onClick={() => setPlayer(player)}
                  />
                ))}
              </div>
            </div>
            <div className="flex h-full w-4/6 gap-5">
              <div className="flex h-full w-1/2 flex-col items-center justify-evenly gap-5">
                <div className="grid h-5/6 w-full place-items-center">
                  {player && (
                    <PlayerCard
                      player={player}
                      tournamentName={props.tournament.name}
                    />
                  )}
                </div>
                <div className="grid h-1/6 place-items-center">
                  {player?.id && (
                    <Link href={`/players/${player?.id}`} passHref>
                      <a className="rounded-xl border-2 border-stone-600 bg-stone-800 p-2 text-stone-400">
                        {'Przejdź do profilu gracza >>'}
                      </a>
                    </Link>
                  )}
                </div>
              </div>
              <div className="w-1/2">
                <div className="mb-4 w-full border-b-2 border-stone-400 pb-2 text-center text-2xl text-stone-400">
                  Historia
                </div>
                <div className="flex flex-col gap-4">
                  {player?.matches.map((match) => {
                    const secondPlayer = props.players.find(
                      (player) => player.id === match.opponent.player.id
                    );
                    const onClick = () => {
                      setPlayer(secondPlayer ?? null);
                      setSearch('');
                    };

                    return (
                      <div
                        key={match.id}
                        className="flex w-full justify-between px-2 text-white"
                      >
                        <div className="flex flex-grow basis-0 justify-center">
                          <ChampionIcon
                            championName={match.self.champion?.name ?? ''}
                            side={match.self.side}
                            href={`/champions/${
                              match.self.champion?.slug ?? ''
                            }`}
                            grayscaled={match.result === 'LOSS'}
                          />
                        </div>
                        <div className="relative grid h-8 flex-grow basis-0 place-items-center self-center">
                          <Link href={`/matches/${match.id}`} passHref>
                            <a>
                              <Image
                                src={getWaywinIcon(match.waywin)}
                                alt={match.waywin}
                                title={getWaywinTooltip(match.waywin)}
                                layout="fill"
                                objectFit="contain"
                                objectPosition="center"
                                className="invert"
                              />
                            </a>
                          </Link>
                        </div>
                        <div className="flex flex-grow basis-0 flex-col items-center">
                          <ChampionIcon
                            championName={match.opponent.champion?.name ?? ''}
                            side={match.opponent.side}
                            href={`/champions/${
                              match.opponent.champion?.slug ?? ''
                            }`}
                            grayscaled={match.result === 'WIN'}
                          />
                          <div
                            role="link"
                            onKeyPress={onClick}
                            onClick={onClick}
                            tabIndex={-1}
                            className="cursor-pointer text-center hover:underline"
                          >
                            {match.opponent.player.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
