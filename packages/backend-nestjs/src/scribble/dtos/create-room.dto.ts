import { IsString, IsEmail, MinLength, ValidateNested, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateRoomDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  readonly username: string;
}
