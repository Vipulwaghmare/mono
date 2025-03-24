import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { CreateRoomDto } from './dtos/create-room.dto';
import { JoinRoomDto } from './dtos/join-room.dto';

@Controller('scribble')
export class ScribbleController {

  @Post('/create-room')
  @ApiOperation({ summary: 'Create a new room' })
  async createRoom(@Body() body: CreateRoomDto) {
    const roomId = uuidv4();

    return {
      roomId,
    }
  }

  @Post('/join-room')
  @ApiOperation({ summary: 'Join a room' })
  async joinRoom(@Body() body: JoinRoomDto) {
    // Redirect to the room page
    return {
      'test': 1
    }
  }
}
