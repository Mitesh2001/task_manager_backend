import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Model } from 'mongoose';
import { createUserDto } from './user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    createUser = async (createUserDto: createUserDto): Promise<User> => {
        const createUser = new this.userModel(createUserDto);
        return createUser.save();
    }

    getAllUsers = async (): Promise<User[]> => {
        return this.userModel.find();
    }

}
