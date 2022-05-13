import { TournamentIndexDTO } from '../../../types/tournament.dto';
import TournamentItem from '../TournamentItem';

interface Props {
  tournaments: TournamentIndexDTO[];
}

export function TournamentList(props: Props) {
  return (
    <div
      id="tournament-container"
      className="flex flex-wrap justify-center gap-4">
      {props.tournaments.map((tournament) => (
        <TournamentItem key={tournament.name} tournament={tournament} />
      ))}
    </div>
  );
}
