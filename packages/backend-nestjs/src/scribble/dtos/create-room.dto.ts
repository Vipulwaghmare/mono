import { IsString, IsEmail, MinLength, ValidateNested, IsUUID } from 'class-validator';
import { ApiProperty, ApiResponseNoStatusOptions } from '@nestjs/swagger';


export class CreateRoomDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  readonly username: string;
}

export class CreateRoomResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  readonly roomId: string;
}

export const createRoomApiResOptions: ApiResponseNoStatusOptions = {
  description: 'Room created successfully',
  type: CreateRoomResponseDto,
};