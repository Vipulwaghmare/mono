import { IsString, IsEmail, MinLength, ValidateNested, IsUUID } from 'class-validator';
import { ApiProperty, ApiResponseNoStatusOptions } from '@nestjs/swagger';


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


export class JoinRoomResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  readonly roomId: string;
}

export const joinRoomApiResOptions: ApiResponseNoStatusOptions = {
  description: 'Room Joind successfully',
  type: JoinRoomResponseDto,
};