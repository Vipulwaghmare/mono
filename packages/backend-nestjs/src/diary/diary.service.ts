import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TDiary, TPersonalEntry, TWorkEntry, TGymEntry, THealthEntry } from './diary.interface';

@Injectable()
export class DiaryService {
  constructor(
    @Inject('DIARY_MODEL')
    private diaryModel: Model<TDiary>,
  ) { }


  async getEntry({ userId, date }: { userId: string; date: Date }): Promise<TDiary | undefined> {
    return this.diaryModel.findOne({ userId, date }).exec();
  };

  async addPersonalEntry({ userId, date, data }: {
    userId: string;
    date: Date;
    data: TPersonalEntry;
  }): Promise<TPersonalEntry> {
    const existingEntry = await this.diaryModel.findOne({ userId, date }).exec();
    if (existingEntry) {
      // If entry exists, append to personal array
      await this.diaryModel.findOneAndUpdate(
        { userId, date },
        { $push: { personal: data } },
        { new: true }
      ).exec();
    } else {
      // If no entry exists, create new document
      await this.diaryModel.create({
        userId,
        date,
        personal: [data],
      });
    }
    return data;
  }

  async addWorkEntry({ userId, date, data }: {
    userId: string;
    date: Date;
    data: TWorkEntry;
  }): Promise<TWorkEntry> {
    const existingEntry = await this.diaryModel.findOne({ userId, date }).exec();
    if (existingEntry) {
      // If entry exists, append to work array
      await this.diaryModel.findOneAndUpdate(
        { userId, date },
        { $push: { work: data } },
        { new: true }
      ).exec();
    } else {
      // If no entry exists, create new document
      await this.diaryModel.create({
        userId,
        date,
        work: [data],
      });
    }
    return data;
  }

  async addGymWorkout({ userId, date, data }: {
    userId: string;
    date: Date;
    data: TGymEntry;
  }): Promise<TGymEntry> {
    const existingEntry = await this.diaryModel.findOne({ userId, date }).exec();

    if (existingEntry) {
      // If entry exists, append to gym array
      await this.diaryModel.findOneAndUpdate(
        { userId, date },
        { $push: { gym: data } },
        { new: true }
      ).exec();
    } else {
      // If no entry exists, create new document
      await this.diaryModel.create({
        userId,
        date,
        gym: [data],
      });
    }
    return data;
  }

  async addHealthEntry({ userId, date, data }: {
    userId: string;
    date: Date;
    data: THealthEntry;
  }): Promise<THealthEntry> {
    const existingEntry = await this.diaryModel.findOne({ userId, date }).exec();
    if (existingEntry) {
      // If entry exists, update health entry
      await this.diaryModel.findOneAndUpdate(
        { userId, date },
        { $set: { health: data } },
        { new: true }
      ).exec();
    } else {
      // If no entry exists, create new document
      await this.diaryModel.create({
        userId,
        date,
        health: data,
      });
    }
    return data;
  }

  async updatePersonalEntry({ userId, date, data }: {
    userId: string;
    date: Date;
    data: TPersonalEntry & { id: string };
  }): Promise<TDiary | null> {
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
        throw new Error('Entry not found');
      }

      return result;
    } catch (error) {
      throw new Error(`Failed to update personal entry: ${error.message}`);
    }
  }

  async deletePersonalEntry({ userId, date, dataId }: {
    userId: string;
    date: Date;
    dataId: string;
  }): Promise<void> {
    try {
      const result = await this.diaryModel.findOneAndUpdate(
        { userId, date },
        { $pull: { personal: { _id: dataId } } },
        { new: true }
      ).exec();

      if (!result) {
        throw new Error('Entry not found');
      }
    } catch (error) {
      throw new Error(`Failed to delete personal entry: ${error.message}`);
    }
  }

  async updateWorkEntry({ userId, date, data }: {
    userId: string;
    date: Date;
    data: TWorkEntry & { id: string };
  }): Promise<TDiary | null> {
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
        throw new Error('Entry not found');
      }

      return result;
    } catch (error) {
      throw new Error(`Failed to update work entry: ${error.message}`);
    }
  }

  async deleteWorkEntry({ userId, date, dataId }: {
    userId: string;
    date: Date;
    dataId: string;
  }): Promise<void> {
    try {
      const result = await this.diaryModel.findOneAndUpdate(
        { userId, date },
        { $pull: { work: { _id: dataId } } },
        { new: true }
      ).exec();

      if (!result) {
        throw new Error('Entry not found');
      }
    } catch (error) {
      throw new Error(`Failed to delete work entry: ${error.message}`);
    }
  }

  async updateGymWorkout({ userId, date, data }: {
    userId: string;
    date: Date;
    data: TGymEntry & { id: string };
  }): Promise<TDiary | null> {
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
        throw new Error('Entry not found');
      }

      return result;
    } catch (error) {
      throw new Error(`Failed to update gym workout: ${error.message}`);
    }
  }

  async deleteGymWorkout({ userId, date, dataId }: {
    userId: string;
    date: Date;
    dataId: string;
  }): Promise<void> {
    try {
      const result = await this.diaryModel.findOneAndUpdate(
        { userId, date },
        { $pull: { gym: { _id: dataId } } },
        { new: true }
      ).exec();

      if (!result) {
        throw new Error('Entry not found');
      }
    } catch (error) {
      throw new Error(`Failed to delete gym workout: ${error.message}`);
    }
  }

  async updateHealthEntry({ userId, date, data }: {
    userId: string;
    date: Date;
    data: THealthEntry;
  }): Promise<TDiary | null> {
    try {
      const result = await this.diaryModel.findOneAndUpdate(
        { userId, date },
        { $set: { health: data } },
        { new: true }
      ).exec();

      if (!result) {
        throw new Error('Entry not found');
      }

      return result;
    } catch (error) {
      throw new Error(`Failed to update health entry: ${error.message}`);
    }
  }

  async deleteHealthEntry({ userId, date }: {
    userId: string;
    date: Date;
  }): Promise<void> {
    try {
      const result = await this.diaryModel.findOneAndUpdate(
        { userId, date },
        { $unset: { health: 1 } },
        { new: true }
      ).exec();

      if (!result) {
        throw new Error('Entry not found');
      }
    } catch (error) {
      throw new Error(`Failed to delete health entry: ${error.message}`);
    }
  }
}
