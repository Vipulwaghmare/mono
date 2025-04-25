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
  tags: [{
    type: String,
    required: true,
  }]
});

// Create indexes for efficient searching
aartiSchema.index({ startLetter: 1 });
aartiSchema.index({ name_english: 1 });
