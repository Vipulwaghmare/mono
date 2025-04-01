import { Document } from "mongoose";

export type TDiary = {
  date: Date;
  userId: string;
  height?: number;
  weight?: number;
  personal?: TPersonalEntry[];
  work?: TWorkEntry[];
  gym?: TGymEntry[];
  health?: THealthEntry;
} & Document;

export type TPersonalEntry = {
  title: string;
  content: string;
}

export type TWorkEntry = {
  title: string;
  content: string;
}

export type TExercise = {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
}

export type TGymEntry = {
  type: 'Strength Training' | 'Cardio' | 'Yoga' | 'Others';
  duration?: number;
  exercises: TExercise[];
  notes?: string;
}

export type TDietEntry = {
  name: string;
  calories?: number;
}

export type THealthEntry = {
  diet: TDietEntry[];
  notes?: string;
}

