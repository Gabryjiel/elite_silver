/** @type {import('next').NextConfig} */
const config = {
  images: {
    domains: ['ddragon.leagueoflegends.com', 'placehold.jp', 'static.wikia.nocookie.net'],
    minimumCacheTTL: 180,
  },
};

module.exports = config;
