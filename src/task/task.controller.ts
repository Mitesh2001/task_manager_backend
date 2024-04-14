import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreateDto, TaskUpdateDto } from './task.dto';
import { CommonResponseDto } from 'src/common-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Post()
    async create(@Body() task: TaskCreateDto): Promise<CommonResponseDto> {
        const createdTask = await this.taskService.create(task);
        return this.setResponse('success', createdTask, "Task Fetched successfully !");
    }

    @Get()
    async getAll(): Promise<CommonResponseDto> {
        const tasks = await this.taskService.getAllTask();
        return this.setResponse('success', tasks, "Tasks Fetched successfully !");
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<CommonResponseDto> {
        const task = await this.taskService.getById(id);
        return this.setResponse('success', task, "Task Fetched successfully !");
    }

    @Put(':id')
    async updateById(@Param('id') id: string, @Body() task: TaskUpdateDto): Promise<CommonResponseDto> {
        const updatedTask = await this.taskService.updateById(id, task);
        return this.setResponse('success', updatedTask, "Task Update successfully !");
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string): Promise<CommonResponseDto> {
        this.taskService.deleteById(id);
        return this.setResponse('success', null, "Task Deleted successfully !");
    }

    private setResponse(status: "success" | "error", data: any, message: string): CommonResponseDto {
        return {
            status,
            message,
            data,
        }
    }

}
