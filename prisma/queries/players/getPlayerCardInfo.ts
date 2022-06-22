import { Match, PlayerMatch } from '@prisma/client';
import { getPlayerPlacement } from './getPlayerPlacement';
import { prisma } from '../../prisma';
import { getPlayerUniqueChampions } from './getPlayerUniqueChampions';

export type PlayerCardInfo = Awaited<ReturnType<typeof getPlayerCardInfo>>;

type PMToCount = Omit<
  PlayerMatch,
  'championId' | 'matchId' | 'playerId' | 'cs'
> & {
  match: Match;
};

function countWins(playerMatches: PMToCount[]) {
  return playerMatches.reduce(
    (all, cur) => (cur.side === cur.match.winside ? all + 1 : all),
    0
  );
}

function countLoses(playerMatches: PMToCount[]) {
  return playerMatches.reduce(
    (all, cur) => (cur.side === cur.match.winside ? all : all + 1),
    0
  );
}

export async function getPlayerCardInfo(playerId: number) {
  const playerMatches = await prisma.playerMatch.findMany({
    select: {
      id: true,
      side: true,
      champion: true,
      match: {
        include: {
          playerMatches: true,
          game: {
            include: {
              stage: true,
            },
          },
        },
      },
      player: {
        include: {
          rank: true,
          tournament: true,
        },
      },
    },
    where: {
      playerId,
    },
  });

  const base = playerMatches.at(0);

  if (!base) {
    throw new Error('404');
  }

  return {
    userId: base.player.userId,
    playerId: base.player.id,
    playerName: base.player.name,
    rankName: base.player.rank?.name ?? null,
    tournamentName: base.player.tournament.name,
    placement: getPlayerPlacement(playerMatches, base.player.id),
    wins: countWins(playerMatches),
    loses: countLoses(playerMatches),
    champions: await getPlayerUniqueChampions(base.player.id),
    matches: [],
  };
}
