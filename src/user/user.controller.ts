import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() createUserDto: createUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get('find')
    async findOne(@Body() { username }: { username: string }): Promise<User> {
        return this.userService.findOne(username);
    }

}