import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DiaryController } from './diary.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { DatabaseModule } from '../database/database.module';
import { CryptoService } from '../services/crypto.service';
import { DiaryService } from './diary.service';
import { diaryProvider } from './diary.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [DiaryController],
  providers: [
    CryptoService,
    ...diaryProvider,
    DiaryService,
  ],
  exports: [DiaryService],
})
export class DiaryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(DiaryController);
  }
}

