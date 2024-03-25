import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class createUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class SignInUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}