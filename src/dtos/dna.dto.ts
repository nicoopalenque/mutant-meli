import { IsArray, IsNotEmpty } from "class-validator";

export class DnaDto {
    @IsArray()
    @IsNotEmpty()
    dna: string[]
}