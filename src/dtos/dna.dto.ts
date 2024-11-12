import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

export class DnaDto {
    @ApiProperty({description: 'list of strings'})
    @IsArray()
    @IsNotEmpty()
    dna: string[]
}