import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { createRoomApiResOptions, CreateRoomDto } from './dtos/create-room.dto';
import { joinRoomApiResOptions, JoinRoomDto } from './dtos/join-room.dto';
import { validationApiResOptions } from 'src/dto/validation-error.dto';

@Controller('scribble')
export class ScribbleController {

  @Post('/create-room')
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse(validationApiResOptions)
  @ApiOkResponse(createRoomApiResOptions)
  async createRoom(@Body() body: CreateRoomDto) {
    const roomId = uuidv4();

    return {
      roomId,
    }
  }

  @Post('/join-room')
  @ApiResponse(validationApiResOptions)
  @ApiOkResponse(joinRoomApiResOptions)
  @ApiOperation({ summary: 'Join a room' })
  async joinRoom(@Body() body: JoinRoomDto) {
    // Redirect to the room page
    return {
      roomId: body.roomId,
    }
  }
}
