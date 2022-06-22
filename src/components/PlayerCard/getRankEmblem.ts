export function getRankEmblem(rank?: string | null) {
  switch (rank) {
    case 'Iron IV':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Iron_4.png';
    case 'Iron III':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/95/Season_2019_-_Iron_3.png';
    case 'Iron II':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/5f/Season_2019_-_Iron_2.png';
    case 'Iron I':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/0/03/Season_2019_-_Iron_1.png';
    case 'Bronze V':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/e/ea/Season_2013_-_Bronze_5.png';
    case 'Bronze IV':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/8/89/Season_2013_-_Bronze_4.png';
    case 'Bronze III':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/0/09/Season_2013_-_Bronze_3.png';
    case 'Bronze II':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/4/41/Season_2013_-_Bronze_2.png';
    case 'Bronze I':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/6/6a/Season_2013_-_Bronze_1.png';
    case 'Silver V':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/1/17/Season_2013_-_Silver_5.png';
    case 'Silver IV':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/a6/Season_2013_-_Silver_4.png';
    case 'Silver III':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/1/1d/Season_2013_-_Silver_3.png';
    case 'Silver II':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/2/21/Season_2013_-_Silver_2.png';
    case 'Silver I':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/8/8d/Season_2013_-_Silver_1.png';
    case 'Gold V':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/b/b5/Season_2013_-_Gold_5.png';
    case 'Gold IV':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/5d/Season_2013_-_Gold_4.png';
    case 'Gold III':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/d/d7/Season_2013_-_Gold_3.png';
    case 'Gold II':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/d/de/Season_2013_-_Gold_2.png';
    case 'Gold I':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/74/Season_2013_-_Gold_1.png';
    case 'Platinum V':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/6/6a/Season_2013_-_Platinum_5.png';
    case 'Platinum IV':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/5a/Season_2013_-_Platinum_4.png';
    case 'Platinum III':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/8/8b/Season_2013_-_Platinum_3.png';
    case 'Platinum II':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/e/e9/Season_2013_-_Platinum_2.png';
    case 'Platinum I':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/9c/Season_2013_-_Platinum_1.png';
    case 'Diamond V':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/c/cc/Season_2013_-_Diamond_5.png';
    case 'Diamond IV':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/8/81/Season_2013_-_Diamond_4.png';
    case 'Diamond III':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/e/e6/Season_2013_-_Diamond_3.png';
    case 'Diamond II':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/58/Season_2013_-_Diamond_2.png';
    case 'Diamond I':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/2/25/Season_2013_-_Diamond_1.png';
    case 'Master':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/8/82/Season_2014_-_Master.png';
    case 'Grandmaster':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/76/Season_2019_-_Grandmaster_1.png';
    case 'Challenger':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/d/d8/Season_2013_-_Challenger.png';
    default:
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/e/e0/Season_2013_-_Provisional.png';
  }
}
