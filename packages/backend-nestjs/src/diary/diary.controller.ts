import { Controller, Get } from '@nestjs/common';

@Controller('diary')
export class DiaryController {

  @Get()
  get() {
    return 'lol';
  }
}
