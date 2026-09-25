import { Router } from 'express';
import { Workout } from '../models.js';

export const workoutRouter = Router();

workoutRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

workoutRouter.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await Workout.create(request.body));
  } catch (error) {
    next(error);
  }
});