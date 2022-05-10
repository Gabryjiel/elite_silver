export const match = {
  matchId: 1,
  tournament: {
    tournamentId: 1,
    name: 'Elite Bronze',
  },
  stage: {
    stageId: 1,
    name: 'Final',
  },
  duration: 10,
  winside: 'blue',
  waywin: 'kill',
  blue: {
    player: {
      playerId: 1,
      name: '',
    },
    champion: {
      championId: 1,
      name: 'Lucian',
    },
    bans: [{ championId: 2, name: 'Caitlyn' }],
    cs: 1,
  },
  red: {
    player: {
      playerId: 1,
      name: '',
    },
    champion: {
      championId: 1,
      name: 'Lucian',
    },
    bans: [{ championId: 2, name: 'Caitlyn' }],
    cs: 1,
  },
};
