import { IsString, IsEmail, MinLength, ValidateNested, IsUUID } from 'class-validator';
import { ApiProperty, ApiResponseNoStatusOptions } from '@nestjs/swagger';

export class GetEventsResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the event',
  })
  readonly id: number;

  @ApiProperty({
    example: 'Doctor\'s Appointment',
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
    example: 'appointment',
    description: 'The type of event',
  })
  @IsString()
  readonly type: string;

  @ApiProperty({
    example: 'Annual checkup at City Hospital',
    description: 'A brief description of the event',
  })
  @IsString()
  readonly description: string;
}

export class GetEventsResponse {
  @ApiProperty({
    type: [GetEventsResponseDto],
  })
  readonly events: GetEventsResponseDto[];
}

export const getEventsApiResOptions: ApiResponseNoStatusOptions = {
  description: 'Room created successfully',
  type: GetEventsResponse,
};

