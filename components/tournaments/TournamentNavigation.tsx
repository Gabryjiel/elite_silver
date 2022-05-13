import { useRouter } from 'next/router';
import TournamentNavItem from './TournamentNavItem';

type TournamentNavigationProps = {
  name: string;
  winner: string;
  tournamentId: string | number;
};

export default function TournamentNavigation(props: TournamentNavigationProps) {
  const router = useRouter();

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex h-32 w-full items-center justify-between pr-32">
        <div className="w-2/6 text-center">
          <span className="text-4xl font-bold text-stone-300">
            {props.name}
          </span>
        </div>
        <div className="flex h-16 w-4/6 justify-around rounded-xl bg-stone-700">
          <TournamentNavItem
            className="rounded-l-xl"
            path={router.asPath}
            href={`/tournaments/${props.tournamentId}`}
          >
            Informacje
          </TournamentNavItem>
          <TournamentNavItem
            path={router.asPath}
            href={`/tournaments/${props.tournamentId}/schema`}
          >
            Drabinka
          </TournamentNavItem>
          <TournamentNavItem
            path={router.asPath}
            href={`/tournaments/${props.tournamentId}/players`}
          >
            Zawodnicy
          </TournamentNavItem>
          <TournamentNavItem
            className="rounded-r-xl"
            path={router.asPath}
            href={`/tournaments/${props.tournamentId}/matches`}
          >
            Mecze
          </TournamentNavItem>
        </div>
      </div>
    </div>
  );
}
