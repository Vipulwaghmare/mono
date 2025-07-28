import { Schema, Types } from 'mongoose';

export const qutoeSchema = new Schema({
  quote: {
    type: String,
    required: [true, 'Please provide a Quote'],
    unique: true,
  },
  author: {
    type: String,
    required: [true, 'Please provide a Author'],
  },
});
