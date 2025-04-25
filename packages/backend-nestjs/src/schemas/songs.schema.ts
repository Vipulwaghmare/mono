import { Schema } from 'mongoose';

export const songSchema = new Schema({
  name_marathi: {
    type: String,
    required: [true, 'Please provide a song name'],
  },
  name_english: {
    type: String,
    required: [true, 'Please provide a song name'],
  },
  lyrics_marathi: {
    type: String,
  },
  lyrics_english: {
    type: String,
    required: [true, 'Please provide English lyrics'],
  },
  meaning: {
    type: String,
  },
  singer: {
    type: String,
  },
  lyricist: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  musicLinks: {
    spotify: String,
    youtube: String,
    jiosaavn: String,
    gaana: String,
  },
  startLetter: {
    type: String,
    required: [true, 'Please provide start letter'],
  }
});

// Create index on startLetter for efficient searching
songSchema.index({ startLetter: 1 });
// Create index on name for efficient searching
songSchema.index({ name_english: 1 });
