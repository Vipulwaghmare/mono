import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Song } from './interfaces/song.interface';
import { Aarti } from './interfaces/aarti.interface';

@Injectable()
export class MarathiService {
  private readonly logger = new Logger(MarathiService.name);

  constructor(
    @Inject('SONG_MODEL')
    private songModel: Model<Song>,
    @Inject('AARTI_MODEL')
    private aartiModel: Model<Aarti>,
  ) { }

  // Song Services
  async getAllSongs(): Promise<Song[]> {
    this.logger.log('Fetching all songs');
    const songs = await this.songModel.find().exec();
    this.logger.log(`Found ${songs.length} songs`);
    return songs;
  }

  async getSongsByQuery(query: string): Promise<Song[]> {
    this.logger.log(`Searching songs with query: ${query}`);
    const songs = await this.songModel.find({
      $or: [
        { name_english: { $regex: query, $options: 'i' } },
        { name_marathi: { $regex: query, $options: 'i' } },
        { singer: { $regex: query, $options: 'i' } },
        { lyricist: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ]
    }).exec();

    if (!songs || songs.length === 0) {
      this.logger.warn(`No songs found matching query: ${query}`);
      throw new NotFoundException(`No songs found matching query '${query}'`);
    }

    this.logger.log(`Found ${songs.length} songs matching query: ${query}`);
    return songs;
  }

  async getSongById(id: string): Promise<Song> {
    this.logger.log(`Fetching song with ID: ${id}`);
    const song = await this.songModel.findById(id).exec();
    if (!song) {
      this.logger.warn(`Song not found with ID: ${id}`);
      throw new NotFoundException('Song not found');
    }
    this.logger.log(`Successfully found song with ID: ${id}`);
    return song;
  }

  async getSongByStartLetter(letter: string): Promise<Song[]> {
    this.logger.log(`Fetching songs starting with letter: ${letter}`);
    const songs = await this.songModel.find({ startLetter: letter }).exec();
    if (!songs || songs.length === 0) {
      this.logger.warn(`No songs found starting with letter: ${letter}`);
      throw new NotFoundException(`No songs found starting with letter '${letter}'`);
    }
    this.logger.log(`Found ${songs.length} songs starting with letter: ${letter}`);
    return songs;
  }

  async createSong(songData: Partial<Song>): Promise<Song> {
    this.logger.log('Creating new song');
    const newSong = new this.songModel(songData);
    const savedSong = await newSong.save();
    this.logger.log(`Successfully created song with ID: ${savedSong._id}`);
    return savedSong;
  }

  async updateSong(id: string, songData: Partial<Song>): Promise<Song> {
    this.logger.log(`Updating song with ID: ${id}`);
    const updatedSong = await this.songModel
      .findByIdAndUpdate(id, songData, { new: true })
      .exec();
    if (!updatedSong) {
      this.logger.warn(`Song not found for update with ID: ${id}`);
      throw new NotFoundException('Song not found');
    }
    this.logger.log(`Successfully updated song with ID: ${id}`);
    return updatedSong;
  }

  async deleteSong(id: string): Promise<void> {
    this.logger.log(`Deleting song with ID: ${id}`);
    const result = await this.songModel.findByIdAndDelete(id).exec();
    if (!result) {
      this.logger.warn(`Song not found for deletion with ID: ${id}`);
      throw new NotFoundException('Song not found');
    }
    this.logger.log(`Successfully deleted song with ID: ${id}`);
  }

  // Aarti Services
  async getAllAartis(): Promise<Aarti[]> {
    this.logger.log('Fetching all aartis');
    const aartis = await this.aartiModel.find().exec();
    this.logger.log(`Found ${aartis.length} aartis`);
    return aartis;
  }

  async getAartiById(id: string): Promise<Aarti> {
    this.logger.log(`Fetching aarti with ID: ${id}`);
    const aarti = await this.aartiModel.findById(id).exec();
    if (!aarti) {
      this.logger.warn(`Aarti not found with ID: ${id}`);
      throw new NotFoundException('Aarti not found');
    }
    this.logger.log(`Successfully found aarti with ID: ${id}`);
    return aarti;
  }

  async createAarti(aartiData: Partial<Aarti>): Promise<Aarti> {
    this.logger.log('Creating new aarti');
    const newAarti = new this.aartiModel(aartiData);
    const savedAarti = await newAarti.save();
    this.logger.log(`Successfully created aarti with ID: ${savedAarti._id}`);
    return savedAarti;
  }

  async updateAarti(id: string, aartiData: Partial<Aarti>): Promise<Aarti> {
    this.logger.log(`Updating aarti with ID: ${id}`);
    const updatedAarti = await this.aartiModel
      .findByIdAndUpdate(id, aartiData, { new: true })
      .exec();
    if (!updatedAarti) {
      this.logger.warn(`Aarti not found for update with ID: ${id}`);
      throw new NotFoundException('Aarti not found');
    }
    this.logger.log(`Successfully updated aarti with ID: ${id}`);
    return updatedAarti;
  }

  async deleteAarti(id: string): Promise<void> {
    this.logger.log(`Deleting aarti with ID: ${id}`);
    const result = await this.aartiModel.findByIdAndDelete(id).exec();
    if (!result) {
      this.logger.warn(`Aarti not found for deletion with ID: ${id}`);
      throw new NotFoundException('Aarti not found');
    }
    this.logger.log(`Successfully deleted aarti with ID: ${id}`);
  }
}
