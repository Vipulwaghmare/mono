import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { quotesProvider } from './quoteProvider';
import { QuotesController } from './quotes.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [QuotesController],
  providers: [QuotesService, ...quotesProvider],
})
export class QuotesModule {
}
