import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskStatus } from './task.schema';
import { Model } from 'mongoose';
import { TaskCreateDto, TaskUpdateDto } from './task.dto';
import { User } from 'src/user/user.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create = async (
    task: TaskCreateDto,
    assignTo: string,
    image: Express.Multer.File,
  ): Promise<Task> => {
    const taskCreate = new this.taskModel({
      ...task,
      status: task.status ?? TaskStatus.TO_DO,
      media: image ? image.path : null,
    });
    const user = await this.userModel.findById(assignTo);
    if (!user)
      throw new NotFoundException(`User with ID ${assignTo} not found`);
    else {
      taskCreate.assignedTo = user.id;
    }
    const savedTask = await taskCreate.save();
    user.tasks.push(savedTask.id);
    user.save();

    return savedTask;
  };

  getAllTask = async (assignedTo: string): Promise<Task[]> => {
    const tasks = await this.taskModel.find({ assignedTo }).exec();
    return tasks;
  };

  getById = async (taskId: string): Promise<Task> => {
    const task = this.taskModel.findById(taskId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return task;
  };

  updateById = async (
    taskId: string,
    taskDetails: TaskUpdateDto,
  ): Promise<Task> => {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      taskId,
      { ...taskDetails, lastUpdatedDate: new Date().toISOString() },
      { new: true },
    );
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return updatedTask;
  };

  deleteById = async (taskId: string): Promise<void> => {
    this.taskModel.findByIdAndDelete(taskId).exec();
  };
}
