import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { getEventsApiResOptions } from './dtos/get-events.dto';

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
  @ApiOkResponse(getEventsApiResOptions)
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
    return {
      personal: personal.map((event) => ({ ...event, date: new Date() })),
      work: work.map((event) => ({ ...event, date: new Date() })),
    };
  }
}
