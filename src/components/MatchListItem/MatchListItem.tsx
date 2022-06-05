import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { getStageBorderColor } from '../../lib/stage.mapper';
import { GetMatchesFromTournamentT } from '../../../prisma/queries';
import { ArrayElement } from '../../types/utils';

interface Props
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'className'
  > {
  match: ArrayElement<GetMatchesFromTournamentT>;
}

export function MatchListItem(props: Props) {
  const { match, ...divProps } = props;
  const borderColor = getStageBorderColor(match.stage.name);

  return (
    <div
      {...divProps}
      className={`flex h-16 w-1/2 shrink-0 items-center justify-between rounded-lg border-2 bg-stone-800 px-2 text-stone-300 transition ease-in-out hover:cursor-pointer hover:border-stone-500 hover:bg-stone-700 ${borderColor}`}
    >
      {match.playerMatches.map((pm) => (
        <div key={`${pm.id}-${pm.player.name}`}>{pm.player.name}</div>
      ))}
    </div>
  );
}
