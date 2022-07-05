import { Champion, Waywin } from '@prisma/client';

import { notEmpty } from '../../../src/lib/functions';

type Data = NonNullable<Awaited<ReturnType<typeof getData>>>;
export type UserStats = NonNullable<Awaited<ReturnType<typeof getUserStats>>>;

const getData = (userId: number) => {
  return prisma?.user.findUnique({
    include: {
      players: {
        include: {
          tournament: {
            include: {
              games: {
                include: {
                  matches: {
                    include: {
                      playerMatches: {
                        include: {
                          champion: true,
                          bans: {
                            include: {
                              champion: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
                where: {
                  matches: {
                    some: {
                      playerMatches: {
                        some: {
                          player: {
                            userId,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    where: {
      id: userId,
    },
  });
};

const calculateWinRatio = (wins: number, games: number) =>
  Math.round((wins / games) * 100);

const getWinRatio = (data: Data) => {
  const winLoses = data.players
    .map((player) =>
      player.tournament.games.map((game) =>
        game.matches.map(
          (match) =>
            match.playerMatches.find((pm) => pm.playerId === player.id)
              ?.side === match.winside
        )
      )
    )
    .flat(2)
    .reduce(
      (all, cur) => {
        if (cur) {
          return { ...all, wins: all.wins + 1 };
        } else {
          return { ...all, loses: all.loses + 1 };
        }
      },
      { wins: 0, loses: 0 }
    );

  return {
    ...winLoses,
    winRatio: calculateWinRatio(winLoses.wins, winLoses.loses + winLoses.wins),
  };
};

const getUniqueChampions = (data: Data) => {
  const champions = data.players
    .map((player) =>
      player.tournament.games.map((game) =>
        game.matches
          .map(
            (match) =>
              match.playerMatches.find((pm) => pm.playerId === player.id)
                ?.champion
          )
          .filter(notEmpty)
      )
    )
    .flat(2)
    .reduce<Champion[]>((all, cur) => {
      if (all.find((item) => cur.id === item.id)) {
        return all;
      }

      return [...all, cur];
    }, []);

  return champions;
};

const getSidePreference = (data: Data) => {
  const winLoses = data.players
    .map((player) =>
      player.tournament.games.map((game) =>
        game.matches.map((match) => {
          const playerMatch = match.playerMatches.find(
            (pm) => pm.playerId === player.id
          );

          if (!playerMatch) {
            return null;
          }

          return {
            didWin: playerMatch.side === match.winside,
            side: playerMatch.side,
            waywin: match.waywin,
          };
        })
      )
    )
    .flat(2)
    .filter(notEmpty)
    .filter((item) => item.waywin !== 'SURRENDER')
    .reduce(
      (all, cur) => {
        const addWins = cur.didWin ? 1 : 0;
        const addLoses = cur.didWin ? 0 : 1;
        const side = cur.side === 'BLUE' ? 'blue' : 'red';

        return {
          ...all,
          [side]: {
            wins: all[side].wins + addWins,
            loses: all[side].loses + addLoses,
          },
        };
      },
      { blue: { wins: 0, loses: 0 }, red: { wins: 0, loses: 0 } }
    );

  return {
    blue: {
      ...winLoses.blue,
      winRatio: calculateWinRatio(
        winLoses.blue.wins,
        winLoses.blue.loses + winLoses.blue.wins
      ),
    },
    red: {
      ...winLoses.red,
      winRatio: calculateWinRatio(
        winLoses.red.wins,
        winLoses.red.loses + winLoses.red.wins
      ),
    },
  };
};

const getWaywinStats = (data: Data) => {
  const result = data.players
    .map((player) =>
      player.tournament.games.map((game) =>
        game.matches.map((match) => {
          const playerMatch = match.playerMatches.find(
            (pm) => pm.playerId === player.id
          );

          if (!playerMatch) {
            return null;
          }

          return {
            didWin: playerMatch.side === match.winside,
            side: playerMatch.side,
            waywin: match.waywin,
          };
        })
      )
    )
    .flat(2)
    .filter(notEmpty)
    .reduce(
      (all, cur) => {
        if (!cur.didWin) {
          return all;
        }

        return {
          ...all,
          [cur.waywin]: all[cur.waywin] + 1,
        };
      },
      {
        [Waywin.KILL]: 0,
        [Waywin.CS]: 0,
        [Waywin.TOWER]: 0,
        [Waywin.SURRENDER]: 0,
      }
    );

  return result;
};

const getLosewinStats = (data: Data) => {
  const result = data.players
    .map((player) =>
      player.tournament.games.map((game) =>
        game.matches.map((match) => {
          const playerMatch = match.playerMatches.find(
            (pm) => pm.playerId === player.id
          );

          if (!playerMatch) {
            return null;
          }

          return {
            didWin: playerMatch.side === match.winside,
            side: playerMatch.side,
            waywin: match.waywin,
          };
        })
      )
    )
    .flat(2)
    .filter(notEmpty)
    .reduce(
      (all, cur) => {
        if (cur.didWin) {
          return all;
        }

        return {
          ...all,
          [cur.waywin]: all[cur.waywin] + 1,
        };
      },
      {
        [Waywin.KILL]: 0,
        [Waywin.CS]: 0,
        [Waywin.TOWER]: 0,
        [Waywin.SURRENDER]: 0,
      }
    );

  return result;
};

const getAvgCsPerGame = (data: Data) => {
  const result = data.players
    .map((player) =>
      player.tournament.games.map((game) =>
        game.matches.map((match) => {
          const playerMatch = match.playerMatches.find(
            (pm) => pm.playerId === player.id
          );

          if (!playerMatch) {
            return null;
          }

          return {
            cs: playerMatch.cs,
          };
        })
      )
    )
    .flat(2)
    .filter(notEmpty)
    .filter((item) => item.cs)
    .map((item) => item?.cs ?? 0)
    .reduce((all, cur, idx, array) => {
      if (idx === array.length - 1) {
        return (all + cur) / array.length;
      }

      return all + cur;
    }, 0);

  return result.toFixed(2);
};

const getAvgTimePerGame = (data: Data) => {
  const result = data.players
    .map((player) =>
      player.tournament.games.map((game) =>
        game.matches.map((match) => match.duration)
      )
    )
    .flat(2)
    .filter(notEmpty)
    .reduce((all, cur, idx, array) => {
      if (idx === array.length - 1) {
        return (all + cur) / array.length;
      }

      return all + cur;
    }, 0);

  const minutes = (result / 60).toFixed(0);
  const seconds = Math.round(result % 60);

  return `${minutes}:${seconds}`;
};

export const getUserStats = async (userId: number) => {
  const data = await getData(userId);

  if (!data) {
    return null;
  }

  const winRatio = getWinRatio(data);
  const uniqueChampions = getUniqueChampions(data);
  const sidePreference = getSidePreference(data);
  const waywinStats = getWaywinStats(data);
  const losewinStats = getLosewinStats(data);
  const avgCsPerGame = getAvgCsPerGame(data);
  const avgTimePerGame = getAvgTimePerGame(data);

  return {
    wins: winRatio.wins,
    loses: winRatio.loses,
    winRatio: winRatio.winRatio,
    avgTimePerGame,
    avgCsPerGame,
    sidePreference,
    uniqueChampions,
    waywinStats,
    losewinStats,
  };
};
