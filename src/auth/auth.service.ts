import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private JwtService: JwtService
    ) { }

    signIn = async (username: string, pass: string): Promise<any> => {

        const user = await this.userService.findOne(username);

        if (user?.password != pass) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username }

        return { access_token: await this.JwtService.signAsync(payload) }

    }

}
