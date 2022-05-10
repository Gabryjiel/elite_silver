import { Champion } from '@prisma/client';
import { excludeDates } from '../../lib/excludeDates';
import { getPlayerPlacement, getStageValue } from '../../lib/stage.mapper';
import prisma from '../prisma';
import { TournamentIndexDTO } from '../../types/tournament.dto';

export async function getTournaments(): Promise<TournamentIndexDTO[]> {
  const result = await prisma.tournament.findMany({
    select: {
      tournamentId: true,
      name: true,
      description: true,
      startDate: true,
      endDate: true,
      matches: {
        include: {
          playerMatches: true,
        },
      },
    },
  });

  const mapped = result.map((tournament) => ({
    id: tournament.tournamentId,
    name: tournament.name,
    startDate: tournament.startDate
      ?.toISOString()
      .slice(0, 10)
      .split('-')
      .reverse()
      .join('.'),
    endDate: tournament.endDate
      ?.toISOString()
      .slice(0, 10)
      .split('-')
      .reverse()
      .join('.'),
    matchCount: tournament.matches.length,
    playerCount: tournament.matches
      .map((item) => item.playerMatches.map((item) => item.playerId))
      .flat()
      .filter((v, i, a) => a.indexOf(v) === i).length,
  }));

  return mapped;
}

export async function getPlayersFromTournament(tournamentId: number) {
  const result = await prisma.tournament.findFirst({
    include: {
      matches: {
        include: {
          playerMatches: {
            include: {
              player: true,
              champion: true,
            },
          },
        },
      },
    },
    where: {
      id: { equals: tournamentId },
    },
  });

  const players = await prisma.player.findMany({
    include: {
      playerMatches: {
        select: {
          champion: true,
          match: {
            include: {
              playerMatches: {
                include: {
                  player: true,
                  champion: true,
                },
              },
              stage: true,
            },
          },
        },
        where: {
          match: {
            tournamentId: tournamentId,
          },
        },
      },
    },
    where: {
      playerMatches: {
        some: {
          match: {
            tournamentId: tournamentId,
          },
        },
      },
    },
  });

  players.forEach((player) => {
    const champions: Champion[] = [];
    let startStageValue = 0;
    let lastMatch = {};
    const record = {
      wins: 0,
      loses: 0,
    };

    player.playerMatches.forEach((pm) => {
      const found = champions.findIndex((c) => c.id === pm.champion?.id);

      const playerSide = pm.match.playerMatches.find(
        (pm2) => pm2.playerId === player.id
      )?.side;
      if (pm.match.winside === playerSide) {
        record.wins = record.wins + 1;
      } else {
        record.loses = record.loses + 1;
      }

      if (found === -1) {
        champions.push({ ...pm.champion, count: 1 });
      } else {
        champions[found].count = champions[found].count + 1;
      }

      const stageValue = getStageValue(pm.match.stage);
      if (stageValue > startStageValue) {
        startStageValue = stageValue;
        lastMatch = pm.match;
      }
    });

    player.champions = champions.sort((a, b) => (a.count < b.count ? 1 : -1));
    player.record = record;
    player.placement = getPlayerPlacement(lastMatch, player);
  });
  return players;
}

export async function getTournamentIds() {
  return prisma.tournament.findMany({
    select: {
      id: true,
    },
  });
}

export async function getTournament(id: number) {
  const tournament = await prisma.tournament.findUnique({ where: { id: id } });

  return {
    ...excludeDates(tournament),
    startDate: tournament?.startDate.toLocaleDateString(),
    endDate: tournament?.endDate.toLocaleDateString(),
  };
}
