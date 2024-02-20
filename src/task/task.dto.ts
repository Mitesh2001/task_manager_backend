import { IsArray, IsDate, IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString } from "class-validator";

enum TaskStatus {
    TODO = 'To do',
    IN_PROGRSS = 'In Progress',
    COMPLETED = 'Completed'
}

export class TaskCreateDto {

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description?: string;

    @IsEnum(TaskStatus)
    @IsNotEmpty()
    readonly status: string;

    @IsOptional()
    @IsISO8601({ strict: true })
    readonly dueDate?: Date;

    @IsOptional()
    @IsISO8601({ strict: true })
    readonly creationDate?: string;

    @IsOptional()
    @IsISO8601({ strict: true })
    readonly lastUpdatedDate?: string;

    @IsArray()
    @IsOptional()
    readonly comments?: { text: string, date: string }[];
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
    @IsISO8601({ strict: true })
    readonly dueDate?: Date;

    @IsOptional()
    @IsISO8601({ strict: true })
    readonly creationDate?: string;

    @IsOptional()
    @IsISO8601({ strict: true })
    readonly lastUpdatedDate?: string;

    @IsArray()
    @IsOptional()
    readonly comments?: { text: string, date: string }[];
}