import { ApiProperty, ApiResponseNoStatusOptions } from "@nestjs/swagger";
import { JWT_DTO } from "../../services/crypto.service";
import { GetUserDto } from "./get-user.dto";

export class UpdateUserDto extends JWT_DTO {
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
}
export const updateUserApiResOptions: ApiResponseNoStatusOptions = {
  description: 'User successfully updated',
  type: GetUserDto,
};

