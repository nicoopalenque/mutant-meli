import { Body, Controller, Get, HttpStatus, Post, Response } from '@nestjs/common';
import { MutantRecruitService } from '../services/mutant-recruit.service';
import { DnaDto } from '../dtos/dna.dto';

@Controller()
export class MutantRecruitController {
  constructor(private readonly mutantRecruitService: MutantRecruitService) { }

  @Post('/mutant')
  async recruitMutant(@Response() response, @Body() { dna }: DnaDto) {
    const isMutant = await this.mutantRecruitService.isMutant(dna)

    isMutant
      ? response.status(HttpStatus.OK).json(isMutant)
      : response.status(HttpStatus.FORBIDDEN).json(isMutant)
  }

  @Get('/stats')
  async getStats(@Response() response) {
    const { count_mutant_dna, count_human_dna } = await this.mutantRecruitService.getStats()
    const ratio = (count_mutant_dna / count_human_dna).toFixed(2)
    
    response.status(HttpStatus.OK).json({
      count_mutant_dna,
      count_human_dna,
      ratio: +ratio
    })
  }
}
