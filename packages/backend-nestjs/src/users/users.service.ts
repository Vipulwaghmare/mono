import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUserDto } from '../auth/dtos/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) { }

  async create(data: CreateUserDto): Promise<User | { error: string }> {
    this.logger.log(`Creating new user with email: ${data.email}`);
    try {
      const createdUser = new this.userModel(data);
      const savedUser = await createdUser.save();
      this.logger.log(`Successfully created user with ID: ${savedUser._id}`);
      return savedUser;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      return { error }
    }
  }

  async update(id: string, updateCatDto: {
    name?: string;
    email?: string;
    password?: string;
    passwordResetData?: { expiryTime: Date; token: string };
    phoneNumber?: string;
    dob?: string;
    bio?: string;
  }): Promise<User | { error: string }> {
    this.logger.log(`Updating user with ID: ${id}`);
    this.logger.debug(`Update data: ${JSON.stringify(updateCatDto, null, 2)}`);
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateCatDto, { new: true }).exec();
      if (!updatedUser) {
        this.logger.warn(`User with ID ${id} not found for update`);
        return { error: 'User not found' };
      }
      this.logger.log(`Successfully updated user with ID: ${id}`);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Failed to update user: ${error.message}`, error.stack);
      return { error }
    }
  }

  async findByEmail(email: string, fields = {}): Promise<User | undefined> {
    this.logger.log(`Finding user by email: ${email}`);
    try {
      const user = await this.userModel.findOne({ email }, fields).exec();
      this.logger.debug(`User found: ${user ? 'yes' : 'no'}`);
      return user;
    } catch (error) {
      this.logger.error(`Failed to find user by email: ${error.message}`, error.stack);
      throw new Error(`Failed to find user by email: ${error.message}`);
    }
  };

  async findById(id: string, fields = {}): Promise<User | undefined> {
    this.logger.log(`Finding user by ID: ${id}`);
    try {
      const user = await this.userModel.findById(id, fields).exec();
      this.logger.debug(`User found: ${user ? 'yes' : 'no'}`);
      return user;
    } catch (error) {
      this.logger.error(`Failed to find user by ID: ${error.message}`, error.stack);
      throw new Error(`Failed to find user by ID: ${error.message}`);
    }
  };
}
