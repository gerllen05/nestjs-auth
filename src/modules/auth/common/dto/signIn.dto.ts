import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SignInDto {
  @ApiProperty({ default: "string@gmail.com" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: "string123" })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
