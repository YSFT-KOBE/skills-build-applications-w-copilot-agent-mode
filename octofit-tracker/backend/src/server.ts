import express from 'express';
import cors from 'cors';
import './config/database.js';
import { activityRouter } from './routes/activities.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { teamRouter } from './routes/teams.js';
import { userRouter } from './routes/users.js';
import { workoutRouter } from './routes/workouts.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use(cors());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiUrl });
});

app.use('/api/users', userRouter);
app.use('/api/teams', teamRouter);
app.use('/api/activities', activityRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutRouter);

app.listen(port, () => {
  console.log(`OctoFit API listening on ${apiUrl}`);
});