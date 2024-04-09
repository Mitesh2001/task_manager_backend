import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private JwtService: JwtService
    ) { }

    signIn = async (username: string, pass: string): Promise<any> => {

        const user = await this.userService.findOne(username);

        if (!user) throw new ForbiddenException("User not found !");

        const passwordMatch = await bcrypt.compare(pass, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username }

        return {
            access_token: await this.JwtService.signAsync(payload)
        }

    }

}
