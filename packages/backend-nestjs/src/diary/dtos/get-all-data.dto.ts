import { IsString, IsEmail, MinLength, ValidateNested, IsUUID } from 'class-validator';
import { ApiProperty, ApiResponseNoStatusOptions } from '@nestjs/swagger';

export class GetPersonalNotesResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the event',
  })
  readonly id: number;

  @ApiProperty({
    example: 'Weekend Trip to the Mountains',
    description: 'The title of the event',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: '2025-03-26',
    description: 'The date of the event',
  })
  readonly date: string;

  @ApiProperty({
    example: 'Had an amazing time hiking in the mountains this weekend',
    description: 'A brief description of the event',
  })
  @IsString()
  readonly description: string;
}

export class GetWorkNotesResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the event',
  })
  readonly id: number;

  @ApiProperty({
    example: 'Client Meeting',
    description: 'The title of the event',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: '2025-03-26',
    description: 'The date of the event',
  })
  readonly date: string;

  @ApiProperty({
    example: 'Had a productive meeting with the client.',
    description: 'A brief description of the event',
  })
  @IsString()
  readonly description: string;
}
export class GetAllDiaryDataResponseDto {
  @ApiProperty({
    type: [GetPersonalNotesResponseDto],
  })
  readonly personal: GetPersonalNotesResponseDto[];

  @ApiProperty({
    type: [GetWorkNotesResponseDto],
  })
  readonly work: GetWorkNotesResponseDto[];
}

export const getEventsApiResOptions: ApiResponseNoStatusOptions = {
  description: 'Room created successfully',
  type: GetAllDiaryDataResponseDto,
};

