import { IsString, IsEmail, MinLength, ValidateNested, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class JoinRoomDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  readonly roomId: string;
}
