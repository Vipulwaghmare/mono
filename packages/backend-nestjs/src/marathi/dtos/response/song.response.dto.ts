import { ApiProperty } from '@nestjs/swagger';

class MusicLinksResponseDto {
  @ApiProperty({ required: false })
  spotify?: string;

  @ApiProperty({ required: false })
  youtube?: string;

  @ApiProperty({ required: false })
  jiosaavn?: string;

  @ApiProperty({ required: false })
  gaana?: string;
}

export class SongResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name_marathi: string;

  @ApiProperty()
  name_english: string;

  @ApiProperty({ required: false })
  lyrics_marathi?: string;

  @ApiProperty()
  lyrics_english: string;

  @ApiProperty({ required: false })
  meaning?: string;

  @ApiProperty({ required: false })
  singer?: string;

  @ApiProperty({ required: false })
  lyricist?: string;

  @ApiProperty({ type: [String], required: false })
  tags?: string[];

  @ApiProperty({ type: MusicLinksResponseDto, required: false })
  musicLinks?: MusicLinksResponseDto;

  @ApiProperty()
  startLetter: string;
} 