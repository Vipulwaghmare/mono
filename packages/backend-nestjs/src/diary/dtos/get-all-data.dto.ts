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
}

export class GetGymProgressResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the workout',
  })
  readonly id: number;

  @ApiProperty({
    example: '2023-06-15',
    description: 'The date of the workout',
  })
  readonly date: string;

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
}

export class GetHealthLogResponseDto {
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
    type: [GetDietEntryDto],
  })
  readonly diet: GetDietEntryDto[];

  @ApiProperty({
    example: 'Had a cheat meal for dinner. Otherwise, stuck to my meal plan.',
    description: 'Notes about the diet and health',
  })
  @IsString()
  readonly notes: string;

  @ApiProperty({
    example: '2023-06-15',
    description: 'The date of the health log entry',
  })
  readonly date: Date;
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
    type: [GetHealthLogResponseDto],
  })
  readonly health: GetHealthLogResponseDto;
}

export const getAllDiaryApiResOptions: ApiResponseNoStatusOptions = {
  description: 'Room created successfully',
  type: GetAllDiaryDataResponseDto,
};

