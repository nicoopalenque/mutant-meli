import { Test, TestingModule } from '@nestjs/testing';
import { MutantRecruitService } from '../../src/services/mutant-recruit.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StatsEntity } from '../../src/entities/stats.estity';
import { Repository } from 'typeorm';

describe('mutant recruit service suite test', () => {
    let mutantRecruitService: MutantRecruitService;
    let statsRepository: Repository<StatsEntity>;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(StatsEntity),
                    useClass: Repository,
                },
                MutantRecruitService
            ]
        }).compile();

        mutantRecruitService = module.get<MutantRecruitService>(MutantRecruitService);
        statsRepository = module.get<Repository<StatsEntity>>(getRepositoryToken(StatsEntity));
    });

    it('should get stats', async () => {
        jest.spyOn(statsRepository, 'findOne').mockResolvedValue(null);
        jest.spyOn(statsRepository, 'create').mockReturnValue({ count_mutant_dna: 0, count_human_dna: 0 } as StatsEntity);
        jest.spyOn(statsRepository, 'save').mockResolvedValue({ count_mutant_dna: 0, count_human_dna: 0 } as StatsEntity);

        const result = await mutantRecruitService.getStats();

        expect(statsRepository.create).toHaveBeenCalled();
        expect(statsRepository.save).toHaveBeenCalled();
        expect(result).toEqual({ count_mutant_dna: 0, count_human_dna: 0 });
    })

    it('should return true if dna is mutant', async () => {
        const mockStats = { id: 1, count_mutant_dna: 0, count_human_dna: 0 };
        jest.spyOn(statsRepository, 'findOne').mockResolvedValue(mockStats);
        jest.spyOn(statsRepository, 'save').mockResolvedValue(mockStats);

        const dnaMutant = [
            "ATGCGA",
            "CAGTGC",
            "TTATGT",
            "AGAAGG",
            "CCCCTA",
            "TCACTG"
        ]
        const result = await mutantRecruitService.isMutant(dnaMutant)

        expect(mockStats.count_mutant_dna).toBe(1);

        expect(result).toEqual(true)
    });

    it('should return true if dna is human', async () => {
        const mockStats = { id: 1, count_mutant_dna: 0, count_human_dna: 0 };

        jest.spyOn(statsRepository, 'findOne').mockResolvedValue(mockStats);
        jest.spyOn(statsRepository, 'save').mockResolvedValue(mockStats);

        const dnaMutant = [
            "ATGC",
            "CAGT",
            "TTAA",
            "AGCT"
        ]
        const result = await mutantRecruitService.isMutant(dnaMutant)

        expect(mockStats.count_human_dna).toBe(1);
        expect(result).toEqual(false)
    })
})