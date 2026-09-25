import { Router } from 'express';
import { Activity } from '../models.js';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    const leaderboard = await Activity.aggregate([
      { $group: { _id: '$username', points: { $sum: '$points' }, activities: { $sum: 1 } } },
      { $project: { _id: 0, username: '$_id', points: 1, activities: 1 } },
      { $sort: { points: -1, username: 1 } },
    ]);
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});