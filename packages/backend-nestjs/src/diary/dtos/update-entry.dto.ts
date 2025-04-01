import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateGymNotesResponseDto, CreateHealthNotesResponseDto, CreatePersonalNotesResponseDto, CreateWorkNotesResponseDto } from './create-entry.dto';

export class UpdatePersonalNotesResponseDto extends CreatePersonalNotesResponseDto {
  @ApiProperty({
    example: '12345678-1234-1234-1234-123456789012',
    description: 'The ID of the event',
  })
  @IsString()
  readonly id: string
}

export class UpdateWorkNotesResponseDto extends CreateWorkNotesResponseDto {
  @ApiProperty({
    example: '12345678-1234-1234-1234-123456789012',
    description: 'The ID of the event',
  })
  @IsString()
  readonly id: string
}

export class UpdateGymNotesResponseDto extends CreateGymNotesResponseDto {
  @ApiProperty({
    example: '12345678-1234-1234-1234-123456789012',
    description: 'The ID of the event',
  })
  @IsString()
  readonly id: string
}

export class UpdateHealthNotesResponseDto extends CreateHealthNotesResponseDto {
}