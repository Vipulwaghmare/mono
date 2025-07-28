import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { TQuote } from './quotes.interface';

@Injectable()
export class QuotesService {
  private readonly logger = new Logger(QuotesService.name);

  constructor(
    @Inject('QUOTE_MODEL')
    private quoteModel: Model<TQuote>,
  ) { }


  async getQuote(): Promise<TQuote | undefined> {
    try {
      const entry = await this.quoteModel.aggregate([{ $sample: { size: 1 } }]).exec();
      return entry[0];
    } catch (error) {
      this.logger.error(`Failed to Get Quote: ${error.message}`, error.stack);
      throw new Error(`Failed to Get Quote`);
    }
  };

  async addQuote({ quote, author }) {
    try {
      const entry = await this.quoteModel.create({ quote, author });
      return entry;
    } catch (error) {
      this.logger.error(`Failed to Add Quote: ${error.message}`, error.stack);
      throw new Error('Failed to add quote');
    }
  }
}
