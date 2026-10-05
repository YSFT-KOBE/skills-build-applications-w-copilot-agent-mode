import { Router } from 'express';
import { Activity } from '../models.js';

export const activityRouter = Router();

activityRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().sort({ recordedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

activityRouter.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await Activity.create(request.body));
  } catch (error) {
    next(error);
  }
});