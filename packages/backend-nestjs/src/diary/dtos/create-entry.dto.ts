import { IsString, IsEmail, MinLength, ValidateNested, IsUUID, IsDate } from 'class-validator';
import { ApiProperty, ApiResponseNoStatusOptions } from '@nestjs/swagger';
import { JWT_DTO } from '../../services/crypto.service';

export class CreatePersonalNotesResponseDto extends JWT_DTO {
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
    example: '2025-03-26',
    description: 'The date of the event',
  })
  @IsString()
  readonly date: string
}

export class CreateWorkNotesResponseDto extends JWT_DTO {
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
    example: '2025-03-26',
    description: 'The date of the event',
  })
  @IsString()
  readonly date: string
}


class GymProgressExerciseDto extends JWT_DTO {
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

export class CreateGymNotesResponseDto extends JWT_DTO {
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
    type: [GymProgressExerciseDto],
  })
  readonly exercises: GymProgressExerciseDto[];

  @ApiProperty({
    example: 'Great workout today. Increased weight on bench press.',
    description: 'A brief description of the workout',
  })
  @IsString()
  readonly notes: string;

  @ApiProperty({
    example: '2025-03-26',
    description: 'The date of the event',
  })
  @IsString()
  readonly date: string
}

class DietEntryDto {
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

export class CreateHealthNotesResponseDto extends JWT_DTO {
  @ApiProperty({
    type: [DietEntryDto],
  })
  readonly diet: DietEntryDto[];

  @ApiProperty({
    example: 'Had a cheat meal for dinner. Otherwise, stuck to my meal plan.',
    description: 'Notes about the diet and health',
  })
  @IsString()
  readonly notes: string;

  @ApiProperty({
    example: '2025-03-26',
    description: 'The date of the event',
  })
  @IsString()
  readonly date: string
}


// export class CreateAllDiaryDataResponseDto {
//   @ApiProperty({
//     type: [GetPersonalNotesResponseDto],
//   })
//   readonly personal: GetPersonalNotesResponseDto[];

//   @ApiProperty({
//     type: [GetWorkNotesResponseDto],
//   })
//   readonly work: GetWorkNotesResponseDto[];

//   @ApiProperty({
//     type: [GetGymProgressResponseDto],
//   })
//   readonly gym: GetGymProgressResponseDto[];

//   @ApiProperty({
//     type: GetHealthLogResponseDto,
//   })
//   readonly health: GetHealthLogResponseDto;

//   @ApiProperty({
//     example: 11,
//     description: 'The weight of the person in kg',
//   })
//   readonly weight: number;

//   @ApiProperty({
//     example: 12,
//     description: 'The height of the person in cm',
//   })
//   readonly height: number;

//   @ApiProperty({
//     example: '2023-06-15',
//     description: 'The date of the entry',
//   })
//   @IsString()
//   readonly date: string;
// }

// export const getCreateEntryResOptions: ApiResponseNoStatusOptions = {
//   description: 'Room created successfully',
//   type: CreateAllDiaryDataResponseDto,
// };

