import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './user.dto';
import { User } from './user.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() createUserDto: createUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    async getAllUsers(@Request() request): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get('find')
    async findOne(@Body() { username }: { username: string }): Promise<User> {
        return this.userService.findByEmail(username);
    }

}