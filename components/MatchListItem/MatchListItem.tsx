import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { GetMatchesFromTournamentT } from '../../prisma/queries';
import { ArrayElement } from '../../types/utils';

interface Props
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'className'
  > {
  match: ArrayElement<GetMatchesFromTournamentT>;
}

export function MatchListItem(props: Props) {
  return (
    <div
      {...props}
      className="flex h-16 w-1/2 shrink-0 items-center justify-between rounded-lg border-2 border-stone-600 bg-stone-800 px-2 text-stone-300 transition ease-in-out hover:cursor-pointer hover:border-stone-500 hover:bg-stone-700"
    >
      {props.match.playerMatches.map((pm) => (
        <div key={`${pm.id}-${pm.player.name}`}>{pm.player.name}</div>
      ))}
    </div>
  );
}
