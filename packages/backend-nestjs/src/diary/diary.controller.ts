import { Body, Controller, Get, Put, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { getEventsApiResOptions } from './dtos/get-events.dto';
import { getAllDiaryApiResOptions } from './dtos/get-all-data.dto';
import { DiaryService } from './diary.service';
import { CreateGymNotesResponseDto, CreateHealthNotesResponseDto, CreatePersonalNotesResponseDto, CreateWorkNotesResponseDto } from './dtos/create-entry.dto';
import { UpdateGymNotesResponseDto, UpdateHealthNotesResponseDto, UpdatePersonalNotesResponseDto, UpdateWorkNotesResponseDto } from './dtos/update-entry.dto';
// import { CreateAllDiaryDataResponseDto, getCreateEntryResOptions } from './dtos/create-entry.dto';

@Controller('diary')
export class DiaryController {
  constructor(
    private readonly diaryService: DiaryService,
  ) { }

  @Get('/events')
  @ApiOkResponse(getEventsApiResOptions)
  getTodaysEvents() {
    const demo = [
      {
        id: 1,
        title: "Doctor's Appointment",
        date: "2025-03-26",
        type: "appointment",
        description: "Annual checkup at City Hospital",
      },
      {
        id: 2,
        title: "Mom's Birthday",
        date: "2025-03-26",
        type: "birthday",
        description: "Don't forget to buy a gift!",
      },
      {
        id: 3,
        title: "Team Meeting",
        date: "2025-03-26",
        type: "meeting",
        description: "Quarterly review with the department",
      },
    ];
    return {
      events: demo.map((event) => ({ ...event, date: new Date() })),
    };
  }

  @Get('/all-data')
  @ApiOkResponse(getAllDiaryApiResOptions)
  getAllData() {
    const personal = [
      {
        title: "Doctor's Appointment",
        content: "Annual checkup at City Hospital",
      },
      {
        title: "Mom's Birthday",
        content: "Don't forget to buy a gift!",
      },
      {
        title: "Team Meeting",
        content: "Quarterly review with the department",
      },
    ];
    const work = [
      {
        title: "Project Milestone Achieved",
        content:
          "Successfully completed the first phase of the project ahead of schedule. The team worked really well together.",
      },
      {
        title: "Client Meeting",
        content:
          "Had a productive meeting with the client. They were pleased with our progress and provided valuable feedback.",
      },
      {
        title: "New Skills Learned",
        content:
          "Spent the day learning a new framework that will help streamline our development process.",
      },
    ];

    const gym = [
      {
        type: "Strength Training",
        duration: 60,
        exercises: [
          { name: "Bench Press", sets: 3, reps: 10, weight: 80 },
          { name: "Squats", sets: 4, reps: 8, weight: 100 },
          { name: "Deadlift", sets: 3, reps: 6, weight: 120 },
        ],
        notes: "Great workout today. Increased weight on bench press.",
      },
      {
        type: "Cardio",
        duration: 45,
        exercises: [
          { name: "Treadmill", sets: 1, reps: 1, weight: 0, duration: 30 },
          { name: "Cycling", sets: 1, reps: 1, weight: 0, duration: 15 },
        ],
        notes: "Focused on cardio today. Felt good.",
      },
      {
        type: "Strength Training",
        duration: 75,
        exercises: [
          { name: "Pull-ups", sets: 3, reps: 8, weight: 0 },
          { name: "Barbell Rows", sets: 3, reps: 10, weight: 60 },
          { name: "Shoulder Press", sets: 3, reps: 10, weight: 40 },
          { name: "Bicep Curls", sets: 3, reps: 12, weight: 15 },
        ],
        notes: "Back and biceps day. Increased reps on pull-ups.",
      },
    ];

    const health = {
      // weight: 11,
      // height: 12,
      diet: [
        {
          name: 'Biryani',
          calories: 600,

        }
      ],
      notes: 'Had a cheat meal for dinner. Otherwise, stuck to my meal plan.',
    }
    return {
      personal: personal.map((event) => ({ ...event, date: new Date() })),
      work: work.map((event) => ({ ...event, date: new Date() })),
      gym,
      health,
      weight: 11,
      height: 11,
    };
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

  // @Put('/entry')
  // putEntry(@Body() body: UpdateEntryDto) {
  //   const entry = this.diaryService.updateEntry(body);
  // }
}
