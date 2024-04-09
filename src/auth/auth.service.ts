import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) { }

    signIn = async (username: string, pass: string): Promise<any> => {

        const user = await this.userService.findOne(username);

        if (user?.password != pass) {
            throw new UnauthorizedException();
        }

        const { password, ...result } = user.toObject();

        return result;

    }

}
