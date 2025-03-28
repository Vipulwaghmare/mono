import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DiaryController } from './diary.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { DatabaseModule } from '../database/database.module';
import { CryptoService } from '../services/crypto.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DiaryController],
  providers: [
    CryptoService
  ],
})
export class DiaryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes(DiaryController);
  }
}

