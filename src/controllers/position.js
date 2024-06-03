import createHttpError from 'http-errors';

import { positionsQueries } from '../queries';
import { db } from '../utils/db';

async function getPositions(req, res, next) {
  try {
    const positionsDBObject = (await db.query(positionsQueries.getAllPositions()));
    const positions = positionsDBObject.rows;

    return res.status(200).json({
      success: true,
      positions,
    });
  } catch (error) {
    next(createHttpError.Conflict('Positions not found'));
  }
}

export { getPositions };
