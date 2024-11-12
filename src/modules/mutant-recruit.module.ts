import { Module } from '@nestjs/common';
import { MutantRecruitController } from '../controllers/mutant-recruit.controller';
import { MutantRecruitService } from '../services/mutant-recruit.service';
import { StatsEntity } from '../entities/stats.estity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StatsEntity])],
  controllers: [MutantRecruitController],
  providers: [MutantRecruitService],
})
export class MutantRecruitModule {}
