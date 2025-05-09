import { IsString, IsEmail, MinLength, ValidateNested, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, ApiResponseNoStatusOptions } from '@nestjs/swagger';

export class GetDiaryEntryQueryDto {
  @ApiProperty({
    example: '2025-03-26',
    description: 'date',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly date?: string; // Made optional

  @ApiProperty({
    example: '2025-03-26',
    description: 'date from',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly dateFrom?: string; // Made optional

  @ApiProperty({
    example: '2025-03-26',
    description: 'date to',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly dateTo?: string; // Made optional

  @ApiProperty({
    enum: ['personal', 'gym', 'health', 'work'],
    description: 'Entry type, should be one of: personal, gym, health, work',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly type?: string; // Made optional
}

export class GetPersonalNotesResponseDto {
  @ApiProperty({
    example: 'Weekend Trip to the Mountains',
    description: 'The title of the event',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'Had an amazing time hiking in the mountains this weekend',
    description: 'A brief description of the event',
  })
  @IsString()
  readonly content: string;

  @ApiProperty({
    example: '67eb8c8028300395ab7df7a0',
    description: 'id of the event',
  })
  @IsString()
  readonly _id: string;
}

export class GetWorkNotesResponseDto {
  @ApiProperty({
    example: 'Client Meeting',
    description: 'The title of the event',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'Had a productive meeting with the client.',
    description: 'A brief description of the event',
  })
  @IsString()
  readonly content: string;

  @ApiProperty({
    example: '67eb8c8028300395ab7df7a0',
    description: 'id of the event',
  })
  @IsString()
  readonly _id: string;
}


export class GetGymProgressResponseExerciseDto {
  @ApiProperty({
    example: 'Bench Press',
    description: 'The name of the exercise',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 3,
    description: 'The number of sets',
  })
  readonly sets: number;

  @ApiProperty({
    example: 10,
    description: 'The number of reps',
  })
  readonly reps: number;

  @ApiProperty({
    example: 80,
    description: 'The weight in kg',
    required: false,
  })
  readonly weight?: number;

  @ApiProperty({
    example: 30,
    description: 'The duration in minutes',
    required: false,
  })
  readonly duration?: number;

  @ApiProperty({
    example: '67eb8c8028300395ab7df7a0',
    description: 'id of the event',
  })
  @IsString()
  readonly _id: string;
}

export class GetGymProgressResponseDto {
  @ApiProperty({
    example: 'Strength Training',
    description: 'The type of workout',
  })
  @IsString()
  readonly type: string;

  @ApiProperty({
    example: 60,
    description: 'The duration of the workout in minutes',
  })
  readonly duration: number;

  @ApiProperty({
    type: [GetGymProgressResponseExerciseDto],
  })
  readonly exercises: GetGymProgressResponseExerciseDto[];

  @ApiProperty({
    example: 'Great workout today. Increased weight on bench press.',
    description: 'A brief description of the workout',
  })
  @IsString()
  readonly notes: string;

  @ApiProperty({
    example: '67eb8c8028300395ab7df7a0',
    description: 'id of the event',
  })
  @IsString()
  readonly _id: string;
}

export class GetDietEntryDto {
  @ApiProperty({
    example: 'Biryani',
    description: 'The name of the food item',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 600,
    description: 'The calories contained in the food item',
  })
  readonly calories: number;

  @ApiProperty({
    example: '67eb8c8028300395ab7df7a0',
    description: 'id of the event',
  })
  @IsString()
  readonly _id: string;
}

export class GetHealthLogResponseDto {

  @ApiProperty({
    type: [GetDietEntryDto],
  })
  readonly diet: GetDietEntryDto[];

  @ApiProperty({
    example: 'Had a cheat meal for dinner. Otherwise, stuck to my meal plan.',
    description: 'Notes about the diet and health',
  })
  @IsString()
  readonly notes: string;
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

  @ApiProperty({
    type: [GetGymProgressResponseDto],
  })
  readonly gym: GetGymProgressResponseDto[];

  @ApiProperty({
    type: GetHealthLogResponseDto,
  })
  readonly health: GetHealthLogResponseDto;

  @ApiProperty({
    example: 11,
    description: 'The weight of the person in kg',
  })
  readonly weight: number;

  @ApiProperty({
    example: 12,
    description: 'The height of the person in cm',
  })
  readonly height: number;

  @ApiProperty({
    example: '67eb8c8028300395ab7df7a0',
    description: 'id of the event',
  })
  @IsString()
  readonly _id: string;

  @ApiProperty({
    example: '67eb8c8028300395ab7df7a0',
    description: 'user id',
  })
  @IsString()
  readonly userId: string;

  @ApiProperty({
    example: '2025-03-26',
    description: 'date',
  })
  @IsString()
  readonly date: string;
}

export const getAllDiaryApiResOptions: ApiResponseNoStatusOptions = {
  description: 'Room created successfully',
  type: GetAllDiaryDataResponseDto,
};

