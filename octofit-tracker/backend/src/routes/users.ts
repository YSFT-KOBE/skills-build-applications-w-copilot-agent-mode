import { Router } from 'express';
import { User } from '../models.js';

export const userRouter = Router();

userRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ username: 1 }));
  } catch (error) {
    next(error);
  }
});

userRouter.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await User.create(request.body));
  } catch (error) {
    next(error);
  }
});