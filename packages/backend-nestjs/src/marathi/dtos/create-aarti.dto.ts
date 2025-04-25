import { IsString, IsArray, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { JWT_DTO } from '../../services/crypto.service';

export class CreateAartiDto extends JWT_DTO {
  @ApiProperty({
    example: 'सुखकर्ता दुःखहर्ता',
    description: 'Name of the aarti in Marathi',
  })
  @IsString()
  readonly name_marathi: string;

  @ApiProperty({
    example: 'Sukhakarta Dukhharta',
    description: 'Name of the aarti in English',
  })
  @IsString()
  readonly name_english: string;

  @ApiProperty({
    example: 'श्री गणेश',
    description: 'Name of the deity',
  })
  @IsString()
  readonly deity: string;

  @ApiProperty({
    example: 'सुखकर्ता दुःखहर्ता वार्ता विघ्नाची',
    description: 'Lyrics of the aarti in Marathi',
  })
  @IsString()
  readonly lyrics_marathi: string;

  @ApiProperty({
    example: 'Sukhakarta Dukhharta Varta Vighnachi',
    description: 'Lyrics of the aarti in English',
  })
  @IsString()
  readonly lyrics_english: string;

  @ApiProperty({
    example: ['गणेश', 'आरती'],
    description: 'Tags/categories for the aarti',
  })
  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];
} 