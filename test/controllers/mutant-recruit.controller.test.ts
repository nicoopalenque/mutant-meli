import { MutantRecruitService } from '../../src/services/mutant-recruit.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MutantRecruitController } from '../../src/controllers/mutant-recruit.controller';
import { StatsEntity } from '../../src/entities/stats.estity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('mutant recruit controller suite test', () => {
    let mutantRecruitService: MutantRecruitService;
    let mutantRecruitController: MutantRecruitController
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MutantRecruitController],
            providers: [
                {
                    provide: getRepositoryToken(StatsEntity),
                    useClass: Repository
                },
                MutantRecruitService
            ]
        }).compile();

        mutantRecruitService = module.get<MutantRecruitService>(MutantRecruitService);
        mutantRecruitController = module.get<MutantRecruitController>(MutantRecruitController);
    })

    it('should verify if a dna is mutant', async () => {
        jest.spyOn(mutantRecruitService, 'isMutant').mockResolvedValue(true);

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const mutant_dna = {
            dna: [
                "ATGCGA",
                "CAGTGC",
                "TTATGT",
                "AGAAGG",
                "CCCCTA",
                "TCACTG"
            ]
        }

        await mutantRecruitController.recruitMutant(response, mutant_dna)

        expect(mutantRecruitService.isMutant).toHaveBeenCalled()
    });

    it('should verify if a dna is human', async () => {
        jest.spyOn(mutantRecruitService, 'isMutant').mockResolvedValue(false);

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const mutant_dna = {
            dna: [
                "ATGC",
                "CAGT",
                "TTAA",
                "AGCT"
            ]
        }

        await mutantRecruitController.recruitMutant(response, mutant_dna)

        expect(mutantRecruitService.isMutant).toHaveBeenCalled()
    });

    it('should return mutant stat', async () => {
        jest.spyOn(mutantRecruitService, 'getStats').mockResolvedValue({
            "id": 1,
            "count_mutant_dna": 40,
            "count_human_dna": 100,
        })

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await mutantRecruitController.getStats(response)

        expect(mutantRecruitService.getStats).toHaveBeenCalled()
    })
})