import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model } from 'mongoose';
import { TaskCreateDto } from './task.dto';

@Injectable()
export class TaskService {

    constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) { }

    create = async (task: TaskCreateDto): Promise<Task> => {
        const taskCreate = new this.taskModel(task);
        return taskCreate.save();
    }

    getAllTask = async (): Promise<Task[]> => {
        return this.taskModel.find();
    }

}