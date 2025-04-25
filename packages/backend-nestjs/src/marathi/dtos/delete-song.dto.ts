import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { JWT_DTO } from '../../services/crypto.service';

export class DeleteSongDto extends JWT_DTO {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'The ID of the song to delete',
  })
  @IsString()
  readonly id: string;
} 