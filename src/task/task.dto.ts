import {
  IsArray,
  IsDate,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatus } from './task.schema';

export class TaskCreateDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  readonly status: string;

  @IsOptional()
  @IsString()
  media: string;

  @IsNotEmpty()
  @IsISO8601({ strict: true })
  readonly dueDate?: Date;
}

export class TaskUpdateDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  readonly status?: string;

  @IsOptional()
  @IsString()
  media: string;

  @IsOptional()
  @IsISO8601({ strict: true })
  readonly dueDate?: Date;
}
