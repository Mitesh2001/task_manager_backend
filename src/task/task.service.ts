import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model } from 'mongoose';
import { TaskCreateDto, TaskUpdateDto } from './task.dto';

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

    getById = async (taskId: string): Promise<Task> => {
        const task = this.taskModel.findById(taskId);
        if (!task) {
            throw new NotFoundException(`Task with ID ${taskId} not found`);
        }
        return task;
    }

    updateById = async (taskId: string, taskDetails: TaskUpdateDto): Promise<Task> => {
        const updatedTask = await this.taskModel.findByIdAndUpdate(taskId, { ...taskDetails, lastUpdatedDate: new Date().toISOString() }, { new: true });
        if (!updatedTask) {
            throw new NotFoundException(`Task with ID ${taskId} not found`);
        }
        return updatedTask;
    }

    deleteById = async (taskId: string): Promise<void> => {
        this.taskModel.findByIdAndDelete(taskId).exec();
    }

}