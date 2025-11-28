import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { IsEmailUnique } from "../validators/is-email-unique.validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    name: string;
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)
    @IsNotEmpty()
    password: string;
    @IsEmail()
    @IsNotEmpty()
    @Validate(IsEmailUnique)
    email: string;
}