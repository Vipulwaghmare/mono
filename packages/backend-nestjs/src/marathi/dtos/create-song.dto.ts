import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { JWT_DTO } from '../../services/crypto.service';

class MusicLinksDto {
  @ApiProperty({
    example: 'https://open.spotify.com/track/123',
    description: 'Spotify link for the song',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly spotify?: string;

  @ApiProperty({
    example: 'https://youtube.com/watch?v=123',
    description: 'YouTube link for the song',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly youtube?: string;

  @ApiProperty({
    example: 'https://jiosaavn.com/song/123',
    description: 'JioSaavn link for the song',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly jiosaavn?: string;

  @ApiProperty({
    example: 'https://gaana.com/song/123',
    description: 'Gaana link for the song',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly gaana?: string;
}

export class CreateSongDto extends JWT_DTO {
  @ApiProperty({
    example: 'अबोली',
    description: 'Name of the song in Marathi',
  })
  @IsString()
  readonly name_marathi: string;

  @ApiProperty({
    example: 'Aboli',
    description: 'Name of the song in English',
  })
  @IsString()
  readonly name_english: string;

  @ApiProperty({
    example: 'अबोली माझी माळावरती फुलली',
    description: 'Lyrics of the song in Marathi',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly lyrics_marathi?: string;

  @ApiProperty({
    example: 'Aboli majhi maalavrati phulali',
    description: 'Lyrics of the song in English',
  })
  @IsString()
  readonly lyrics_english: string;

  @ApiProperty({
    example: 'This song describes the beauty of the Aboli flower blooming on a hill',
    description: 'Meaning or description of the song',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly meaning?: string;

  @ApiProperty({
    example: 'लता मंगेशकर',
    description: 'Name of the singer',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly singer?: string;

  @ApiProperty({
    example: 'ग. दि. माडगूळकर',
    description: 'Name of the lyricist',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly lyricist?: string;

  @ApiProperty({
    example: ['भावगीत', 'निसर्ग'],
    description: 'Tags/categories for the song',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly tags?: string[];

  @ApiProperty({
    type: MusicLinksDto,
    required: false,
  })
  @ValidateNested()
  @IsOptional()
  readonly musicLinks?: MusicLinksDto;

  @ApiProperty({
    example: 'अ',
    description: 'Starting letter of the song in Marathi',
  })
  @IsString()
  readonly startLetter: string;
} 