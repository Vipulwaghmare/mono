import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CryptoService } from './services/crypto.service';
import { EmailService } from './services/email.service';
import { PortfolioController } from './portfolio/portfolio.controller';
import { ScribbleController } from './scribble/scribble.controller';
import { DiaryModule } from './diary/diary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    MessagesModule,
    UsersModule,
    AuthModule,
    DiaryModule,
  ],
  controllers: [AppController, AuthController, PortfolioController, ScribbleController],
  providers: [AppService, CryptoService, EmailService],
})
export class AppModule { }
