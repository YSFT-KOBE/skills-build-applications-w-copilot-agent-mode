import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      { username: 'alex', email: 'alex@example.com', name: 'Alex Morgan' },
      { username: 'jordan', email: 'jordan@example.com', name: 'Jordan Lee' },
      { username: 'sam', email: 'sam@example.com', name: 'Sam Rivera' },
    ]);

    await Team.insertMany([
      { name: 'Trailblazers', members: ['alex', 'jordan'] },
      { name: 'Peak Performers', members: ['sam'] },
    ]);

    await Activity.insertMany([
      { username: 'alex', type: 'Running', duration: 35, points: 70, recordedAt: new Date('2026-09-20T07:30:00Z') },
      { username: 'alex', type: 'Cycling', duration: 45, points: 90, recordedAt: new Date('2026-09-22T17:00:00Z') },
      { username: 'jordan', type: 'Strength', duration: 40, points: 80, recordedAt: new Date('2026-09-21T18:00:00Z') },
      { username: 'jordan', type: 'Yoga', duration: 30, points: 45, recordedAt: new Date('2026-09-23T06:30:00Z') },
      { username: 'sam', type: 'Swimming', duration: 50, points: 100, recordedAt: new Date('2026-09-24T08:00:00Z') },
    ]);

    await Leaderboard.insertMany([
      { username: 'sam', points: 100, activities: 1 },
      { username: 'alex', points: 160, activities: 2 },
      { username: 'jordan', points: 125, activities: 2 },
    ]);

    await Workout.insertMany([
      { name: 'Morning Cardio', category: 'Cardio', difficulty: 'Beginner', duration: 25 },
      { name: 'Full Body Strength', category: 'Strength', difficulty: 'Intermediate', duration: 40 },
      { name: 'Recovery Flow', category: 'Flexibility', difficulty: 'Beginner', duration: 20 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
