import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { createUserDto, updateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

  createUser = async (createUserDto: createUserDto): Promise<User> => {
    const hashedPassword = await bcrypt.hashSync(createUserDto.password, 10);
    const createUser = new this.userModel({ ...createUserDto, password: hashedPassword });
    return createUser.save();
  }

  getAllUsers = async (): Promise<UserDocument[]> => {
    return this.userModel.find();
  }

  findById = async (id: User['_id']): Promise<UserDocument> => {
    return await this.userModel.findById(id).exec();
  }

  findByEmail = async (email: User["email"]): Promise<User> => {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  update = async (id: User["id"], updateUserDto: updateUserDto): Promise<UserDocument> => {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec()
  }

  remove = async (id: UserDocument['id']): Promise<UserDocument> => {
    return this.userModel.findByIdAndDelete(id);
  }



}
