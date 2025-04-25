import { Schema } from 'mongoose';

export const aartiSchema = new Schema({
  name_marathi: {
    type: String,
    required: [true, 'Please provide aarti name'],
  },
  name_english: {
    type: String,
    required: [true, 'Please provide aarti name'],
  },
  deity: {
    type: String,
    required: [true, 'Please provide deity name'],
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
    required: [true, 'Please provide singer name'],
  },
  lyricist: {
    type: String,
    required: [true, 'Please provide lyricist name'],
  },
  tags: [{
    type: String,
    required: true,
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
  },
  occasion: {
    type: String,
  },
  timeOfDay: {
    type: String,
    enum: ['Morning', 'Evening', 'Any'],
    default: 'Any'
  }
});

// Create indexes for efficient searching
aartiSchema.index({ startLetter: 1 });
aartiSchema.index({ name_english: 1 });
