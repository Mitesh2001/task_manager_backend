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

    signIn = async (email: string, pass: string): Promise<any> => {

        const user = await this.userService.findByEmail(email);

        if (!user) throw new ForbiddenException("User not found !");

        const passwordMatch = await bcrypt.compare(pass, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException();
        }

        const payload = { id: user.id, email: user.email }

        return {
            access_token: await this.JwtService.signAsync(payload)
        }

    }

}
