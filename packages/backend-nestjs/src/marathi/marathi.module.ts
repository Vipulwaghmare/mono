import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MarathiController } from './marathi.controller';
import { MarathiService } from './marathi.service';
import { DatabaseModule } from '../database/database.module';
import { CryptoService } from '../services/crypto.service';
import { marathiProvider } from './marathi.provider';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [MarathiController],
  providers: [
    CryptoService,
    ...marathiProvider,
    MarathiService,
  ],
  exports: [MarathiService],
})
export class MarathiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        method: RequestMethod.POST,
        path: '/marathi/aarti'
      },
      {
        method: RequestMethod.PUT,
        path: '/marathi/aarti/:id'
      },
      {
        method: RequestMethod.DELETE,
        path: '/marathi/aarti/:id'
      },
      {
        method: RequestMethod.POST,
        path: '/marathi/aarti'
      },
      {
        method: RequestMethod.PUT,
        path: '/marathi/song/:id'
      },
      {
        method: RequestMethod.DELETE,
        path: '/marathi/song/:id'
      }
    );
  }
}
