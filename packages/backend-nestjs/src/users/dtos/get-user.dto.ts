import { ApiProperty, ApiResponseNoStatusOptions } from "@nestjs/swagger";

export class GetUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  readonly name?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  readonly email?: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890',
  })
  readonly phoneNumber?: string;

  @ApiProperty({
    description: 'The date of birth of the user',
    example: '2021-01-01',
  })
  readonly dob?: string;

  @ApiProperty({
    description: 'The bio of the user',
    example: 'I am a software engineer',
  })
  readonly bio?: string;

  @ApiProperty({
    description: 'The ID of the user',
    example: '1234567890',
  })
  readonly id?: string;
}

export const getUserApiResOptions: ApiResponseNoStatusOptions = {
  description: 'User successfully fetched',
  type: GetUserDto,
};
