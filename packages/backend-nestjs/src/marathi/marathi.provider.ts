
import { Connection } from 'mongoose';
import { aartiSchema } from 'src/schemas/aarti.schema';
import { songSchema } from 'src/schemas/songs.schema';

export const marathiProvider = [
  {
    provide: 'SONG_MODEL',
    useFactory: (connection: Connection) => connection.model('Song', songSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'AARTI_MODEL',
    useFactory: (connection: Connection) => connection.model('Aarti', aartiSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
