import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/user/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }, { name: User.name, schema: UserSchema }]),
    JwtModule
  ],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule { }
