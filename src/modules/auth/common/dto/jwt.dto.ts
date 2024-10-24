import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class JWTDto {
    @ApiProperty()
    @IsNotEmpty()
    access_token: string;
}