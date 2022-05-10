import TournamentItem from '../TournamentItem';

export function TournamentList(props: any) {
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
