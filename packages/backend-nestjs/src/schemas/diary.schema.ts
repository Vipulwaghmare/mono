import { Schema, Types } from 'mongoose';

export const diarySchema = new Schema({
  date: {
    type: Date,
    required: [true, 'Please provide a date'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user'],
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  personal: [
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    }
  ],
  work: [
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    }
  ],
  gym: [
    {
      type: {
        type: String,
        enum: ['Strength Training', 'Cardio', 'Yoga', 'Others'],
        required: true,
      },
      duration: {
        type: Number,
      },
      exercises: [
        {
          name: {
            type: String,
            required: true,
          },
          sets: {
            type: Number,
          },
          reps: {
            type: Number,
          },
          weight: {
            type: Number,
          },
          duration: {
            type: Number,
          },
        }
      ],
      notes: {
        type: String,
      },
    }
  ],
  health: {
    diet: [
      {
        name: {
          type: String,
          required: true,
        },
        calories: {
          type: Number,
        },
      }
    ],
    notes: {
      type: String,
    },
  },
});

// Enforce unique date per user (ignoring time portion)
diarySchema.index({ userId: 1, date: 1 }, { unique: true });
