import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreateDto } from './task.dto';
import { Task } from './task.schema';

@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Post()
    async create(@Body() task: TaskCreateDto): Promise<Task> {
        return this.taskService.create(task);
    }

    @Get()
    async getAll(): Promise<Task[]> {
        return this.taskService.getAllTask();
    }

}
