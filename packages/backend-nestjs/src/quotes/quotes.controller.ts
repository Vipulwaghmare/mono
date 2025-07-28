import { Body, Controller, Get, MethodNotAllowedException, Post } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { CreateQuoteDto, getQuoteApiResOptions, createQuoteApiResOptions } from './dtos/quote.dto';

@Controller('quotes')
export class QuotesController {
  constructor(
    private readonly quoteService: QuotesService,
  ) { }
  @Get()
  @ApiOkResponse(getQuoteApiResOptions)
  async getQuote() {
    const { quote, author } = await this.quoteService.getQuote();
    return { quote, author };
  }

  @Post()
  @ApiBody({ type: CreateQuoteDto })
  @ApiOkResponse(createQuoteApiResOptions)
  createQuote(@Body() body: CreateQuoteDto) {
    if (process.env.quote_token !== body.token) {
      throw new MethodNotAllowedException('You are not allowed to add quotes');
    }
    return this.quoteService.addQuote({ quote: body.quote, author: body.author });
  }
}
