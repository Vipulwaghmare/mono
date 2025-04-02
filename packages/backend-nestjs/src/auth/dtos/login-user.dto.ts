import { ApiProperty, ApiResponseOptions } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'john.doe@email.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'password@1234'
  })
  @IsString()
  @MinLength(6)
  readonly password: string;
}


export class LoginResponseDto {
  @ApiProperty({ example: 'User is logged in with email: user@example.com', description: 'Success message' })
  success: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT access token' })
  accessToken: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'MongoDB user ID' })
  userId: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'User name' })
  name: string;
}

export const loginApiResOptions: ApiResponseOptions = {
  status: 200,
  description: 'Login successful.',
  type: LoginResponseDto,
};