import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dto';
import { Request } from 'express';
import { createUserDto } from 'src/user/user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

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

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Req() req: Request) {
        this.authService.logOut(req.user['sub']);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshTokens(@Req() req: Request) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshTokens(userId, refreshToken);
    }

    @UseGuards(AccessTokenGuard)
    @Post('verify_token')
    async getUserByToken(@Req() req: Request) {
        const accessToken = this.extractTokenFromHeader(req);
        return this.authService.getUserByToken(accessToken);
    }

    extractTokenFromHeader = (request: Request): string | undefined => {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}