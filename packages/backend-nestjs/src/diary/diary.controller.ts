import { Body, Controller, Get, Put, Post, Delete, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { getEventsApiResOptions } from './dtos/get-events.dto';
import { getAllDiaryApiResOptions, GetDiaryEntryQueryDto } from './dtos/get-all-data.dto';
import { DiaryService } from './diary.service';
import { CreateGymNotesResponseDto, CreateHealthNotesResponseDto, CreatePersonalNotesResponseDto, CreateWorkNotesResponseDto } from './dtos/create-entry.dto';
import { UpdateGymNotesResponseDto, UpdateHealthNotesResponseDto, UpdatePersonalNotesResponseDto, UpdateWorkNotesResponseDto } from './dtos/update-entry.dto';
import { DeletePersonalEntryDto, DeleteWorkEntryDto, DeleteGymEntryDto, DeleteHealthEntryDto } from './dtos/delete-entry.dto';
import { JWT_DTO } from '../services/crypto.service';
// import { CreateAllDiaryDataResponseDto, getCreateEntryResOptions } from './dtos/create-entry.dto';

@Controller('diary')
export class DiaryController {
  constructor(
    private readonly diaryService: DiaryService,
  ) { }

  // @Get('/events')
  // @ApiOkResponse(getEventsApiResOptions)
  // getTodaysEvents() {
  //   const demo = [
  //     {
  //       id: 1,
  //       title: "Doctor's Appointment",
  //       date: "2025-03-26",
  //       type: "appointment",
  //       description: "Annual checkup at City Hospital",
  //     },
  //     {
  //       id: 2,
  //       title: "Mom's Birthday",
  //       date: "2025-03-26",
  //       type: "birthday",
  //       description: "Don't forget to buy a gift!",
  //     },
  //     {
  //       id: 3,
  //       title: "Team Meeting",
  //       date: "2025-03-26",
  //       type: "meeting",
  //       description: "Quarterly review with the department",
  //     },
  //   ];
  //   return {
  //     events: demo.map((event) => ({ ...event, date: new Date() })),
  //   };
  // }

  @Get('/')
  @ApiOkResponse(getAllDiaryApiResOptions)
  getAllData(@Query() query: GetDiaryEntryQueryDto, @Body() body: JWT_DTO) {
    const now = new Date();
    const utcMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const date = query?.date ? new Date(query.date) : utcMidnight;
    if (query.dateFrom && query.dateTo) {
      return this.diaryService.getEntriesInDateRange({
        userId: body.jwtPayload.userId,
        dateFrom: new Date(query.dateFrom),
        dateTo: new Date(query.dateTo),
        entryTypes: ['personal', 'work', 'gym', 'health'].filter(v => v === query.type) as ['personal', 'work', 'gym', 'health'],
      })
    }
    return this.diaryService.getEntry({
      userId: body.jwtPayload.userId,
      date,
    });
  }

  @Post('/entry/personal')
  postPersonalEntry(@Body() body: CreatePersonalNotesResponseDto) {
    return this.diaryService.addPersonalEntry({
      userId: body.jwtPayload.userId,
      date: new Date(body.date),
      data: {
        title: body.title,
        content: body.content,
      }
    });
  }

  @Post('/entry/work')
  postWorkEntry(@Body() body: CreateWorkNotesResponseDto) {
    return this.diaryService.addWorkEntry({
      userId: body.jwtPayload.userId,
      date: new Date(body.date),
      data: {
        title: body.title,
        content: body.content,
      }
    });
  }

  @Post('/entry/gym')
  postGymEntry(@Body() body: CreateGymNotesResponseDto) {
    return this.diaryService.addGymWorkout({
      userId: body.jwtPayload.userId,
      date: new Date(body.date),
      data: {
        type: body.type as "Strength Training" | "Cardio" | "Yoga" | "Others",
        duration: body.duration,
        exercises: body.exercises,
        notes: body.notes,
      },
    })
  }
  @Post('/entry/health')
  postHealthEntry(@Body() body: CreateHealthNotesResponseDto) {
    return this.diaryService.addHealthEntry({
      userId: body.jwtPayload.userId,
      date: new Date(body.date),
      data: {
        diet: body.diet,
        notes: body.notes
      },
    })
  }

  @Put('/entry/personal')
  putPersonalEntry(@Body() body: UpdatePersonalNotesResponseDto) {
    return this.diaryService.updatePersonalEntry({
      userId: body.jwtPayload.userId,
      date: new Date(body.date),
      data: {
        title: body.title,
        content: body.content,
        id: body.id,
      }
    });
  }

  @Put('/entry/work')
  putWorkEntry(@Body() body: UpdateWorkNotesResponseDto) {
    return this.diaryService.updateWorkEntry({
      userId: body.jwtPayload.userId,
      date: new Date(body.date),
      data: {
        title: body.title,
        content: body.content,
        id: body.id,
      }
    });
  }

  @Put('/entry/gym')
  putGymEntry(@Body() body: UpdateGymNotesResponseDto) {
    return this.diaryService.updateGymWorkout({
      userId: body.jwtPayload.userId,
      date: new Date(body.date),
      data: {
        type: body.type as "Strength Training" | "Cardio" | "Yoga" | "Others",
        duration: body.duration,
        exercises: body.exercises,
        notes: body.notes,
        id: body.id,
      }
    });
  }

  @Put('/entry/health')
  putHealthEntry(@Body() body: UpdateHealthNotesResponseDto) {
    return this.diaryService.updateHealthEntry({
      userId: body.jwtPayload.userId,
      date: new Date(body.date),
      data: {
        diet: body.diet,
        notes: body.notes,
      }
    });
  }

  @Delete('/entry/personal')
  deletePersonalEntry(@Body() body: DeletePersonalEntryDto) {
    return this.diaryService.deletePersonalEntry({
      userId: body.jwtPayload.userId,
      date: new Date(body.date),
      dataId: body.id
    });
  }

  @Delete('/entry/work')
  deleteWorkEntry(@Body() body: DeleteWorkEntryDto) {
    return this.diaryService.deleteWorkEntry({
      userId: body.jwtPayload.userId,
      date: new Date(body.date),
      dataId: body.id
    });
  }

  @Delete('/entry/gym')
  deleteGymEntry(@Body() body: DeleteGymEntryDto) {
    return this.diaryService.deleteGymWorkout({
      userId: body.jwtPayload.userId,
      date: new Date(body.date),
      dataId: body.id
    });
  }

  @Delete('/entry/health')
  deleteHealthEntry(@Body() body: DeleteHealthEntryDto) {
    return this.diaryService.deleteHealthEntry({
      userId: body.jwtPayload.userId,
      date: new Date(body.date)
    });
  }
}
