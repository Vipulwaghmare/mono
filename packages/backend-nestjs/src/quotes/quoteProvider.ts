
import { Connection } from 'mongoose';
import { qutoeSchema } from '../schemas/quote.schema';

export const quotesProvider = [
  {
    provide: 'QUOTE_MODEL',
    useFactory: (connection: Connection) => connection.model('Quote', qutoeSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
