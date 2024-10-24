import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class JwtDto {
    @ApiProperty()
    @IsNotEmpty()
    access_token: string;
}