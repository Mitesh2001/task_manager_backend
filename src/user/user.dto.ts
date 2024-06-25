import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createUserDto {

    @IsOptional()
    @IsString()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    refreshToken?: string;
}

export type updateUserDto = Partial<createUserDto>;

export class SignInUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}