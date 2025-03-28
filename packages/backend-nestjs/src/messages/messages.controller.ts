import { Body, Controller, Get, InternalServerErrorException, Logger, Param, Post } from '@nestjs/common';
import { ContactMeDto } from './dtos/create-messages.dto';
import { EmailService } from '../services/email.service';

// Controller is class decorator as we use it for entire class
// GET, POST are method decorators as we use it for each method
// BODY, PARAM, QUERY are argument decorators as we use it for each argument

@Controller('/api/v1/message')
export class MessagesController {
  private readonly logger = new Logger(MessagesController.name);
  constructor(
    private readonly emailService: EmailService,
  ) { }

  @Post('/contact-me')
  async createMessage(@Body() body: ContactMeDto) {
    try {
      this.logger.log({ body }, 'Sending contac me message');
      await this.emailService.sendEmail({
        to: 'vipulwaghmare222@gmail.com',
        subject: `${body.email}  ${body.subject}`,
        text: body.message,
      })
      return {
        message: 'Successfully sent contact me message',
      }
    } catch {
      throw new InternalServerErrorException('Failed to send contact me message');

    }
  }
}
