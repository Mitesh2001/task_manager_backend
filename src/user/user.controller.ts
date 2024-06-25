import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UnauthorizedException,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, updateUserDto } from './user.dto';
import { User } from './user.schema';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) { }

  @Post()
  async createUser(@Body() createUserDto: createUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async findById(@Param("id") id: User['id']) {
    return this.userService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: updateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('verify_token')
  async getUserByToken(@Body() data: { access_token: string }) {
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

}
