import { IsString, IsEmail } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ContactMeDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john.doe@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Regarding a job opportunity',
  })
  @IsString()
  subject: string;

  @ApiProperty({
    example: 'Hi Vipul, ...',
  })
  @IsString()
  message: string;
}
