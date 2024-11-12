import { Injectable } from '@nestjs/common';
import { hasMutantSequence } from '../helpers/mutant-analyzer';
import { StatsEntity } from '../entities/stats.estity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MutantRecruitService {
  constructor(
    @InjectRepository(StatsEntity)
    private statsRepository: Repository<StatsEntity>
  ) {}

  async isMutant(dna: string[]) {
    const isMutant = hasMutantSequence(dna);
    const stats = await this.getStats();
    isMutant ? stats.count_mutant_dna++ : stats.count_human_dna++;

    await this.saveStats(stats)

    return hasMutantSequence(dna)
  }

  async getStats() {
    let stats = await this.statsRepository.findOne({ where: { id: 1 }})

    if(!stats) {
      stats = this.statsRepository.create();
      await this.statsRepository.save(stats)
    }

    return stats;
  }

  private async saveStats(stats) {
    await this.statsRepository.save(stats)
  }
}
