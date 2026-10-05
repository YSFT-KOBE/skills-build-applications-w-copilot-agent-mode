import mongoose, { type Document, type Model } from 'mongoose';

interface UserDocument extends Document {
  username: string;
  email: string;
  name: string;
}

interface TeamDocument extends Document {
  name: string;
  members: string[];
}

interface ActivityDocument extends Document {
  username: string;
  type: string;
  duration: number;
  points: number;
  recordedAt: Date;
}

interface WorkoutDocument extends Document {
  name: string;
  category: string;
  difficulty: string;
  duration: number;
}

interface LeaderboardDocument extends Document {
  username: string;
  points: number;
  activities: number;
}

const userSchema = new mongoose.Schema<UserDocument>({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
});

const teamSchema = new mongoose.Schema<TeamDocument>({
  name: { type: String, required: true, trim: true },
  members: { type: [String], default: [] },
});

const activitySchema = new mongoose.Schema<ActivityDocument>({
  username: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  duration: { type: Number, required: true, min: 1 },
  points: { type: Number, required: true, min: 0 },
  recordedAt: { type: Date, default: Date.now },
});

const workoutSchema = new mongoose.Schema<WorkoutDocument>({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  difficulty: { type: String, required: true, trim: true },
  duration: { type: Number, required: true, min: 1 },
});

const leaderboardSchema = new mongoose.Schema<LeaderboardDocument>({
  username: { type: String, required: true, unique: true, trim: true },
  points: { type: Number, required: true, min: 0 },
  activities: { type: Number, required: true, min: 0 },
});

export const User: Model<UserDocument> = mongoose.models.User || mongoose.model('User', userSchema);
export const Team: Model<TeamDocument> = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity: Model<ActivityDocument> = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard: Model<LeaderboardDocument> = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout: Model<WorkoutDocument> = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);