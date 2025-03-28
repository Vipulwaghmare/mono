import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { EmailService } from '../services/email.service';

@Module({
  controllers: [MessagesController],
  providers: [
    EmailService,
  ]
})
export class MessagesModule {
}
