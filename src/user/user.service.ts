import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor() { }

    createUser = async () => {
        return {
            message: "New User Created successfully !"
        }
    }

}
