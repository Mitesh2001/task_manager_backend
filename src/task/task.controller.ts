import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreateDto, TaskUpdateDto } from './task.dto';
import { CommonResponseDto } from 'src/common-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request } from 'express';
import { saveImageToStorage } from 'src/helper/image-storage';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@UseGuards(AccessTokenGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    task: TaskCreateDto,
    @Req() req: Request,
  ): Promise<unknown> {
    const createdTask = await this.taskService.create(
      { ...task },
      req.user['sub'],
      file,
    );
    return this.setResponse(
      'success',
      createdTask,
      'Task Created successfully !',
    );
  }

  @Get()
  async getAll(@Req() req: Request): Promise<CommonResponseDto> {
    const tasks = await this.taskService.getAllTask(req.user['sub']);
    return this.setResponse('success', tasks, 'Tasks Fetched successfully !');
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<CommonResponseDto> {
    const task = await this.taskService.getById(id);
    return this.setResponse('success', task, 'Task Fetched successfully !');
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  async updateById(
    @Param('id') id: string,
    @Body() task: TaskUpdateDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CommonResponseDto> {
    const updatedTask = await this.taskService.updateById(id, task, file);
    return this.setResponse(
      'success',
      updatedTask,
      'Task Update successfully !',
    );
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<CommonResponseDto> {
    this.taskService.deleteById(id);
    return this.setResponse('success', null, 'Task Deleted successfully !');
  }

  private setResponse(
    status: 'success' | 'error',
    data: any,
    message: string,
  ): CommonResponseDto {
    return {
      status,
      message,
      data,
    };
  }
}
