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
}

export class updateUserDto {

    @IsOptional()
    @IsString()
    name: string

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;
}

export class SignInUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}