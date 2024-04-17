import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { createUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    createUser = async (createUserDto: createUserDto): Promise<User> => {
        const hashedPassword = await bcrypt.hashSync(createUserDto.password, 10);
        const createUser = new this.userModel({ ...createUserDto, password: hashedPassword });
        return createUser.save();
    }

    getAllUsers = async (): Promise<User[]> => {
        return this.userModel.find();
    }

    findByEmail = async (email: string): Promise<User | undefined> => {
        const user = await this.userModel.findOne({ "email": email });
        if (!user) {
            return undefined
        }
        return user;
    }

}
