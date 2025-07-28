import { ApiProperty, ApiResponseNoStatusOptions } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QuoteDto {
  @ApiProperty({
    description: 'The quote text',
    example: 'To be or not to be, that is the question.',
  })
  @IsString()
  quote: string;

  @ApiProperty({
    description: 'The author of the quote',
    example: 'William Shakespeare',
  })
  @IsString()
  author: string;
}

export class CreateQuoteDto {
  @ApiProperty({
    description: 'The quote text',
    example: 'To be or not to be, that is the question.',
  })
  @IsString()
  quote: string;

  @ApiProperty({
    description: 'The author of the quote',
    example: 'William Shakespeare',
  })
  @IsString()
  author: string;

  @ApiProperty({
    description: 'My Secret token! you are not allowed to add quotes',
    example: 'I will not tell you XD',
  })
  @IsString()
  token: string;
}

export const getQuoteApiResOptions: ApiResponseNoStatusOptions = {
  description: 'Random quote successfully fetched',
  type: QuoteDto,
};

export const createQuoteApiResOptions: ApiResponseNoStatusOptions = {
  description: 'Quote successfully created',
  type: QuoteDto,
}; 