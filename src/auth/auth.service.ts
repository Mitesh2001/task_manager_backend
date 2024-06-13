import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/user.schema';
import { createUserDto } from 'src/user/user.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private JwtService: JwtService,
        private configService: ConfigService
    ) { }

    signUp = async (createUserDto: createUserDto) => {

        const user = await this.userService.findByEmail(createUserDto.email);

        if (user) throw new BadRequestException("User already exists");

        const hashedPassword = await bcrypt.hashSync(createUserDto.password, 10);

        const newUser = await this.userService.createUser({
            ...createUserDto,
            password: hashedPassword,
        });

        const tokens = await this.getTokens(newUser.id, newUser.email);

        await this.updateRefreshToken(newUser.id, tokens.refreshToken)

        return tokens

    }

    signIn = async (email: string, pass: string): Promise<any> => {

        const user = await this.userService.findByEmail(email);

        if (!user) throw new ForbiddenException("User not found !");

        const passwordMatch = await bcrypt.compare(pass, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException();
        }

        const tokens = await this.getTokens(user.id, user.email);

        await this.updateRefreshToken(user.id, tokens.refreshToken)

        return tokens

    }

    logOut = async (userId: User['id']) => {
        return await this.userService.update(userId, { refreshToken: null })
    }

    updateRefreshToken = async (userId: User['id'], refreshToken: User['refreshToken']) => {
        const hashedToken = await bcrypt.hashSync(refreshToken, 10)
        await this.userService.update(userId, { refreshToken: hashedToken })
    }

    getTokens = async (userId: string, email: string) => {

        const [accessToken, refreshToken] = await Promise.all([
            await this.JwtService.signAsync({
                sub: userId,
                email
            }, {
                secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
                expiresIn: "15m"
            }),
            await this.JwtService.signAsync({
                sub: userId,
                email
            }, {
                secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
                expiresIn: "7d"
            })
        ])

        return { accessToken, refreshToken }

    }

    refreshTokens = async (userId: User['id'], refreshToken: User['refreshToken']) => {

        const user = await this.userService.findById(userId);

        if (!user || !user.refreshToken)
            throw new ForbiddenException('Access Denied');

        const refreshTokenMatches = await bcrypt.compareSync(refreshToken, user.refreshToken);

        if (!refreshTokenMatches)
            throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user.id, user.email);

        await this.updateRefreshToken(user.id, tokens.refreshToken)

        return tokens

    }

}
