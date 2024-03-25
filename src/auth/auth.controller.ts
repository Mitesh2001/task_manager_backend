import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() body: SignInUserDto) {
        return this.authService.signIN(body.username, body.password);
    }

}