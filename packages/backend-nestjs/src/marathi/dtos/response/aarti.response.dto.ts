import { ApiProperty } from '@nestjs/swagger';

export class AartiResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name_marathi: string;

  @ApiProperty()
  name_english: string;

  @ApiProperty()
  deity: string;

  @ApiProperty()
  lyrics_marathi: string;

  @ApiProperty()
  lyrics_english: string;

  @ApiProperty({ type: [String] })
  tags: string[];
} 