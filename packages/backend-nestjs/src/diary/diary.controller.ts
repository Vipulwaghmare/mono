import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { getEventsApiResOptions } from './dtos/get-events.dto';
import { getAllDiaryApiResOptions } from './dtos/get-all-data.dto';

@Controller('diary')
export class DiaryController {

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
    const work = [
      {
        id: 1,
        title: "Project Milestone Achieved",
        content:
          "Successfully completed the first phase of the project ahead of schedule. The team worked really well together.",
        date: "2023-06-14",
      },
      {
        id: 2,
        title: "Client Meeting",
        content:
          "Had a productive meeting with the client. They were pleased with our progress and provided valuable feedback.",
        date: "2023-06-12",
      },
      {
        id: 3,
        title: "New Skills Learned",
        content:
          "Spent the day learning a new framework that will help streamline our development process.",
        date: "2023-06-08",
      },
    ];

    const gym = [
      {
        id: 1,
        date: new Date(),
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
        id: 2,
        date: new Date(),
        type: "Cardio",
        duration: 45,
        exercises: [
          { name: "Treadmill", sets: 1, reps: 1, weight: 0, duration: 30 },
          { name: "Cycling", sets: 1, reps: 1, weight: 0, duration: 15 },
        ],
        notes: "Focused on cardio today. Felt good.",
      },
      {
        id: 3,
        date: new Date(),
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
      weight: 11,
      height: 12,
      diet: [
        {
          name: 'Biryani',
          calories: 600,

        }
      ],
      notes: 'Had a cheat meal for dinner. Otherwise, stuck to my meal plan.',
      date: new Date(),
    }
    return {
      personal: personal.map((event) => ({ ...event, date: new Date() })),
      work: work.map((event) => ({ ...event, date: new Date() })),
      gym,
      health
    };
  }
}
