
import { Connection } from 'mongoose';
import { diarySchema } from '../schemas/diary.schema';

export const diaryProvider = [
  {
    provide: 'DIARY_MODEL',
    useFactory: (connection: Connection) => connection.model('Diary', diarySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
