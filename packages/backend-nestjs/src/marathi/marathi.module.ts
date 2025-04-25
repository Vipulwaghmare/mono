import { Module } from '@nestjs/common';
import { MarathiController } from './marathi.controller';
import { MarathiService } from './marathi.service';
import { DatabaseModule } from '../database/database.module';
import { CryptoService } from '../services/crypto.service';
import { marathiProvider } from './marathi.provider';

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
export class MarathiModule { }
