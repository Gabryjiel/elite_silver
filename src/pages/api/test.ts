import type { NextApiRequest, NextApiResponse } from 'next';
import { getMatchesFromTournament } from '../../../prisma/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await getMatchesFromTournament(3);
  res.status(200).json(result);
}
