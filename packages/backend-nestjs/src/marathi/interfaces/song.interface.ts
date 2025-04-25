import { Document } from 'mongoose';

export interface Song extends Document {
  name_marathi: string;
  name_english: string;
  lyrics_marathi?: string;
  lyrics_english: string;
  meaning?: string;
  singer?: string;
  lyricist?: string;
  tags?: string[];
  musicLinks?: {
    spotify?: string;
    youtube?: string;
    jiosaavn?: string;
    gaana?: string;
  };
  startLetter: string;
} 