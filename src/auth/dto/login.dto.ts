import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail({}, {message: "Email isn't formatted correctly"})
    @ApiProperty()
    email: string;

    @IsNotEmpty({message: "Password is not empty"})
    @ApiProperty()
    pass_word: string;
}