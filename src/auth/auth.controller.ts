import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dto';
import { Request } from 'express';
import { createUserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    SignIn(@Body() data: SignInDto) {
        return this.authService.signIn(data.email, data.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post("signup")
    signup(@Body() createUserDto: createUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @Get('logout')
    logout(@Req() req: Request) {
        console.log("req", req.user)
        this.authService.logOut(req.user['sub']);
    }

}
