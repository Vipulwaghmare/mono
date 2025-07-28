import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { quotesProvider } from './quoteProvider';
import { QuotesController } from './quotes.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [QuotesController],
  providers: [QuotesService, ...quotesProvider],
})
export class QuotesModule {
}
