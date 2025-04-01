import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';
import { JWT_DTO } from '../../services/crypto.service';

export class DeletePersonalEntryDto extends JWT_DTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDateString()
  date: string;
}

export class DeleteWorkEntryDto extends JWT_DTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDateString()
  date: string;
}

export class DeleteGymEntryDto extends JWT_DTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDateString()
  date: string;
}

export class DeleteHealthEntryDto extends JWT_DTO {
  @ApiProperty()
  @IsDateString()
  date: string;
}
