import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './user.dto';
import { User } from './user.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: createUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('verify_token')
  async getUserByToken(@Body() data: { access_token: string }): Promise<User> {
    try {
      const payload = await this.jwtService.verifyAsync(data.access_token, {
        secret:
          'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE',
      });
      const user = await this.userService.findByEmail(payload.email);
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
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
