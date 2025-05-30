import { Body, Controller, Get, InternalServerErrorException, Logger, Param, Post } from '@nestjs/common';
import { ContactMeDto } from './dtos/create-messages.dto';
import { EmailService } from '../services/email.service';

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
        to: 'contact@vipulwaghmare.com',
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