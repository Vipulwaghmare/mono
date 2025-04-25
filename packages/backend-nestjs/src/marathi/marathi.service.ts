import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class MarathiService {
  private readonly logger = new Logger(MarathiService.name);

  constructor(
    @Inject('SONG_MODEL')
    private songModel: Model<any>,
    @Inject('AARTI_MODEL')
    private aartiModel: Model<any>,
  ) { }

}
