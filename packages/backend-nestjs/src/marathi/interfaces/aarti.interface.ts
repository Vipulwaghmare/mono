import { Document } from 'mongoose';

export interface Aarti extends Document {
  name_marathi: string;
  name_english: string;
  deity: string;
  lyrics_marathi: string;
  lyrics_english: string;
  tags: string[];
} 