import { Controller, Get, Body, Patch, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JWT_DTO } from '../services/crypto.service';
import { updateUserApiResOptions, UpdateUserDto } from './dtos/update-user.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { getUserApiResOptions } from './dtos/get-user.dto';
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
  ) { }

  @Get('/')
  @ApiOkResponse(getUserApiResOptions)
  async getUser(@Body() body: JWT_DTO) {
    return this.userService.findById(body.jwtPayload.userId, {
      name: 1,
      email: 1,
      _id: 1,
      phoneNumber: 1,
      dob: 1,
      bio: 1,
    });
  }

  @Patch('/')
  @ApiOkResponse(updateUserApiResOptions)
  async updateUser(@Body() { jwtPayload, ...data }: UpdateUserDto) {
    if ('password' in data) {
      throw new BadRequestException('Password update is not allowed.');
    }
    return this.userService.update(jwtPayload.userId, data);
  }
}