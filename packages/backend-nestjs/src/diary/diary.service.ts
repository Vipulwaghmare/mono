import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { TDiary, TPersonalEntry, TWorkEntry, TGymEntry, THealthEntry } from './diary.interface';

@Injectable()
export class DiaryService {
  private readonly logger = new Logger(DiaryService.name);

  constructor(
    @Inject('DIARY_MODEL')
    private diaryModel: Model<TDiary>,
  ) { }


  async getEntry({ userId, date }: { userId: string; date: Date }): Promise<TDiary | undefined> {
    this.logger.log(`Fetching diary entry for user ${userId} on ${date.toISOString()}`);
    try {
      const entry = await this.diaryModel.findOne({ userId, date }).exec();
      this.logger.debug(`Entry found: ${entry ? 'yes' : 'no'}`);
      return entry;
    } catch (error) {
      this.logger.error(`Failed to fetch diary entry: ${error.message}`, error.stack);
      throw new Error(`Failed to fetch diary entry: ${error.message}`);
    }
  };

  async getEntriesInDateRange({
    userId,
    dateFrom,
    dateTo,
    entryTypes = ['personal', 'work', 'gym', 'health']
  }: {
    userId: string;
    dateFrom: Date;
    dateTo: Date;
    entryTypes?: Array<'personal' | 'work' | 'gym' | 'health'>;
  }): Promise<TDiary[]> {
    try {
      this.logger.log(`Fetching diary entries for user ${userId} from ${dateFrom.toISOString()} to ${dateTo.toISOString()}`);
      const projection: Record<string, number> = { userId: 1, date: 1 };
      const types = entryTypes.length === 0 ? ['personal', 'work', 'gym', 'health'] : entryTypes;
      this.logger.debug(`Entry types requested: ${entryTypes.join(', ')}`);
      types.forEach(type => {
        projection[type] = 1;
      });
      const entries = await this.diaryModel
        .find(
          {
            userId,
            date: {
              $gte: dateFrom,
              $lte: dateTo
            }
          },
          projection
        )
        .sort({ date: 1 })
        .exec();

      this.logger.log(`Found ${entries.length} diary entries for user ${userId}`);
      return entries;
    } catch (error) {
      this.logger.error(`Failed to retrieve entries in date range: ${error.message}`, error.stack);
      throw new Error(`Failed to retrieve entries in date range: ${error.message}`);
    }
  }

  async addPersonalEntry({ userId, date, data }: {
    userId: string;
    date: Date;
    data: TPersonalEntry;
  }): Promise<TPersonalEntry> {
    this.logger.log(`Adding personal entry for user ${userId} on ${date.toISOString()}`);
    try {
      const existingEntry = await this.diaryModel.findOne({ userId, date }).exec();
      if (existingEntry) {
        // If entry exists, append to personal array
        this.logger.debug(`Appending to existing diary entry for user ${userId}`);
        await this.diaryModel.findOneAndUpdate(
          { userId, date },
          { $push: { personal: data } },
          { new: true }
        ).exec();
      } else {
        // If no entry exists, create new document
        this.logger.debug(`Creating new diary entry for user ${userId}`);
        await this.diaryModel.create({
          userId,
          date,
          personal: [data],
        });
      }
      this.logger.log(`Successfully added personal entry for user ${userId}`);
      return data;
    } catch (error) {
      this.logger.error(`Failed to add personal entry: ${error.message}`, error.stack);
      throw new Error(`Failed to add personal entry: ${error.message}`);
    }
  }

  async addWorkEntry({ userId, date, data }: {
    userId: string;
    date: Date;
    data: TWorkEntry;
  }): Promise<TWorkEntry> {
    this.logger.log(`Adding work entry for user ${userId} on ${date.toISOString()}`);
    try {
      const existingEntry = await this.diaryModel.findOne({ userId, date }).exec();
      if (existingEntry) {
        // If entry exists, append to work array
        this.logger.debug(`Appending to existing diary entry for user ${userId}`);
        await this.diaryModel.findOneAndUpdate(
          { userId, date },
          { $push: { work: data } },
          { new: true }
        ).exec();
      } else {
        // If no entry exists, create new document
        this.logger.debug(`Creating new diary entry for user ${userId}`);
        await this.diaryModel.create({
          userId,
          date,
          work: [data],
        });
      }
      this.logger.log(`Successfully added work entry for user ${userId}`);
      return data;
    } catch (error) {
      this.logger.error(`Failed to add work entry: ${error.message}`, error.stack);
      throw new Error(`Failed to add work entry: ${error.message}`);
    }
  }

  async addGymWorkout({ userId, date, data }: {
    userId: string;
    date: Date;
    data: TGymEntry;
  }): Promise<TGymEntry> {
    this.logger.log(`Adding gym workout for user ${userId} on ${date.toISOString()}`);
    try {
      const existingEntry = await this.diaryModel.findOne({ userId, date }).exec();

      if (existingEntry) {
        // If entry exists, append to gym array
        this.logger.debug(`Appending to existing diary entry for user ${userId}`);
        await this.diaryModel.findOneAndUpdate(
          { userId, date },
          { $push: { gym: data } },
          { new: true }
        ).exec();
      } else {
        // If no entry exists, create new document
        this.logger.debug(`Creating new diary entry for user ${userId}`);
        await this.diaryModel.create({
          userId,
          date,
          gym: [data],
        });
      }
      this.logger.log(`Successfully added gym workout for user ${userId}`);
      return data;
    } catch (error) {
      this.logger.error(`Failed to add gym workout: ${error.message}`, error.stack);
      throw new Error(`Failed to add gym workout: ${error.message}`);
    }
  }

  async addHealthEntry({ userId, date, data }: {
    userId: string;
    date: Date;
    data: THealthEntry;
  }): Promise<THealthEntry> {
    this.logger.log(`Adding health entry for user ${userId} on ${date.toISOString()}`);
    try {
      const existingEntry = await this.diaryModel.findOne({ userId, date }).exec();
      if (existingEntry) {
        // If entry exists, update health entry
        this.logger.debug(`Updating existing health entry for user ${userId}`);
        await this.diaryModel.findOneAndUpdate(
          { userId, date },
          { $set: { health: data } },
          { new: true }
        ).exec();
      } else {
        // If no entry exists, create new document
        this.logger.debug(`Creating new diary entry for user ${userId}`);
        await this.diaryModel.create({
          userId,
          date,
          health: data,
        });
      }
      this.logger.log(`Successfully added health entry for user ${userId}`);
      return data;
    } catch (error) {
      this.logger.error(`Failed to add health entry: ${error.message}`, error.stack);
      throw new Error(`Failed to add health entry: ${error.message}`);
    }
  }

  async updatePersonalEntry({ userId, date, data }: {
    userId: string;
    date: Date;
    data: TPersonalEntry & { id: string };
  }): Promise<TDiary | null> {
    this.logger.log(`Updating personal entry ${data.id} for user ${userId} on ${date.toISOString()}`);
    try {
      const result = await this.diaryModel.findOneAndUpdate(
        {
          userId,
          date,
          'personal._id': data.id
        },
        {
          $set: {
            'personal.$.title': data.title,
            'personal.$.content': data.content
          }
        },
        { new: true }
      ).exec();

      if (!result) {
        this.logger.warn(`Personal entry ${data.id} not found for user ${userId}`);
        throw new Error('Entry not found');
      }

      this.logger.log(`Successfully updated personal entry ${data.id} for user ${userId}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to update personal entry: ${error.message}`, error.stack);
      throw new Error(`Failed to update personal entry: ${error.message}`);
    }
  }

  async deletePersonalEntry({ userId, date, dataId }: {
    userId: string;
    date: Date;
    dataId: string;
  }): Promise<void> {
    this.logger.log(`Deleting personal entry ${dataId} for user ${userId} on ${date.toISOString()}`);
    try {
      const result = await this.diaryModel.findOneAndUpdate(
        { userId, date },
        { $pull: { personal: { _id: dataId } } },
        { new: true }
      ).exec();

      if (!result) {
        this.logger.warn(`Personal entry ${dataId} not found for user ${userId}`);
        throw new Error('Entry not found');
      }

      this.logger.log(`Successfully deleted personal entry ${dataId} for user ${userId}`);
    } catch (error) {
      this.logger.error(`Failed to delete personal entry: ${error.message}`, error.stack);
      throw new Error(`Failed to delete personal entry: ${error.message}`);
    }
  }

  async updateWorkEntry({ userId, date, data }: {
    userId: string;
    date: Date;
    data: TWorkEntry & { id: string };
  }): Promise<TDiary | null> {
    this.logger.log(`Updating work entry ${data.id} for user ${userId} on ${date.toISOString()}`);
    try {
      const result = await this.diaryModel.findOneAndUpdate(
        {
          userId,
          date,
          'work._id': data.id
        },
        {
          $set: {
            'work.$.title': data.title,
            'work.$.content': data.content
          }
        },
        { new: true }
      ).exec();

      if (!result) {
        this.logger.warn(`Work entry ${data.id} not found for user ${userId}`);
        throw new Error('Entry not found');
      }

      this.logger.log(`Successfully updated work entry ${data.id} for user ${userId}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to update work entry: ${error.message}`, error.stack);
      throw new Error(`Failed to update work entry: ${error.message}`);
    }
  }

  async deleteWorkEntry({ userId, date, dataId }: {
    userId: string;
    date: Date;
    dataId: string;
  }): Promise<void> {
    this.logger.log(`Deleting work entry ${dataId} for user ${userId} on ${date.toISOString()}`);
    try {
      const result = await this.diaryModel.findOneAndUpdate(
        { userId, date },
        { $pull: { work: { _id: dataId } } },
        { new: true }
      ).exec();

      if (!result) {
        this.logger.warn(`Work entry ${dataId} not found for user ${userId}`);
        throw new Error('Entry not found');
      }

      this.logger.log(`Successfully deleted work entry ${dataId} for user ${userId}`);
    } catch (error) {
      this.logger.error(`Failed to delete work entry: ${error.message}`, error.stack);
      throw new Error(`Failed to delete work entry: ${error.message}`);
    }
  }

  async updateGymWorkout({ userId, date, data }: {
    userId: string;
    date: Date;
    data: TGymEntry & { id: string };
  }): Promise<TDiary | null> {
    this.logger.log(`Updating gym workout ${data.id} for user ${userId} on ${date.toISOString()}`);
    try {
      const result = await this.diaryModel.findOneAndUpdate(
        {
          userId,
          date,
          'gym._id': data.id
        },
        {
          $set: {
            'gym.$.type': data.type,
            'gym.$.duration': data.duration,
            'gym.$.exercises': data.exercises,
            'gym.$.notes': data.notes
          }
        },
        { new: true }
      ).exec();

      if (!result) {
        this.logger.warn(`Gym workout ${data.id} not found for user ${userId}`);
        throw new Error('Entry not found');
      }

      this.logger.log(`Successfully updated gym workout ${data.id} for user ${userId}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to update gym workout: ${error.message}`, error.stack);
      throw new Error(`Failed to update gym workout: ${error.message}`);
    }
  }

  async deleteGymWorkout({ userId, date, dataId }: {
    userId: string;
    date: Date;
    dataId: string;
  }): Promise<void> {
    this.logger.log(`Deleting gym workout ${dataId} for user ${userId} on ${date.toISOString()}`);
    try {
      const result = await this.diaryModel.findOneAndUpdate(
        { userId, date },
        { $pull: { gym: { _id: dataId } } },
        { new: true }
      ).exec();

      if (!result) {
        this.logger.warn(`Gym workout ${dataId} not found for user ${userId}`);
        throw new Error('Entry not found');
      }

      this.logger.log(`Successfully deleted gym workout ${dataId} for user ${userId}`);
    } catch (error) {
      this.logger.error(`Failed to delete gym workout: ${error.message}`, error.stack);
      throw new Error(`Failed to delete gym workout: ${error.message}`);
    }
  }

  async updateHealthEntry({ userId, date, data }: {
    userId: string;
    date: Date;
    data: THealthEntry;
  }): Promise<TDiary | null> {
    this.logger.log(`Updating health entry for user ${userId} on ${date.toISOString()}`);
    try {
      const result = await this.diaryModel.findOneAndUpdate(
        { userId, date },
        { $set: { health: data } },
        { new: true }
      ).exec();

      if (!result) {
        this.logger.warn(`Health entry not found for user ${userId}`);
        throw new Error('Entry not found');
      }

      this.logger.log(`Successfully updated health entry for user ${userId}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to update health entry: ${error.message}`, error.stack);
      throw new Error(`Failed to update health entry: ${error.message}`);
    }
  }

  async deleteHealthEntry({ userId, date }: {
    userId: string;
    date: Date;
  }): Promise<void> {
    this.logger.log(`Deleting health entry for user ${userId} on ${date.toISOString()}`);
    try {
      const result = await this.diaryModel.findOneAndUpdate(
        { userId, date },
        { $unset: { health: 1 } },
        { new: true }
      ).exec();

      if (!result) {
        this.logger.warn(`Health entry not found for user ${userId}`);
        throw new Error('Entry not found');
      }

      this.logger.log(`Successfully deleted health entry for user ${userId}`);
    } catch (error) {
      this.logger.error(`Failed to delete health entry: ${error.message}`, error.stack);
      throw new Error(`Failed to delete health entry: ${error.message}`);
    }
  }
}
