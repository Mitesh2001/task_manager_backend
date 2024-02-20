import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreateDto, TaskUpdateDto } from './task.dto';
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

    @Get(':id')
    async getById(@Param('id') id: string): Promise<any> {
        return this.taskService.getById(id);
    }

    @Put(':id')
    async updateById(@Param('id') id: string, @Body() task: TaskUpdateDto): Promise<Task> {
        return this.taskService.updateById(id, task);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string): Promise<any> {
        return this.taskService.deleteById(id);
    }
}
