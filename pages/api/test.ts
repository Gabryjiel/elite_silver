import type { NextApiRequest, NextApiResponse } from 'next';
import { getPlayersFromTournament } from '../../prisma/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await getPlayersFromTournament(1);
  res.status(200).json(result);
}
