import { hasMutantSequence } from '../../src/helpers/mutant-analyzer';
describe('mutant analyzer helper suite test', () => {
    it('dna no mutant expect to be false', () => {
        const dna_no_mutant = [
            "ATGCGA",
            "CAGTGC",
            "TTATTT",
            "AGACGG",
            "GCGTCA",
            "TCACTG"
        ]
        expect(hasMutantSequence(dna_no_mutant)).toBe(false)
    });

    it('dna mutant horizontal patter should return true', () => {
        const dna_mutant_horizontal = [
            "AAAACT",
            "CAGTGC",
            "TTATGT",
            "AGAAGG",
            "CCCCTA",
            "TCACTG"
        ]
        expect(hasMutantSequence(dna_mutant_horizontal)).toBe(true)
    })

    it('dna mutant vertical patter should return true', () => {
        const dna_mutant_vertical = [
            "ATGCGA",
            "AAGTGC",
            "AATGTG",
            "AAGAGG",
            "CCCCTA",
            "TCACTG"
        ]
        expect(hasMutantSequence(dna_mutant_vertical)).toBe(true)
    })

    it('dna mutant diagonal patter should return true', () => {
        const dna_mutant_diagonal = [
            "ATGCGA",
            "CAGTAC",
            "TTATGT",
            "AGAAGG",
            "CCCCTA",
            "TCACTG"
        ]
        expect(hasMutantSequence(dna_mutant_diagonal)).toBe(true)
    })

    it('dna mutant diagonal left patter should return true', () => {
        const dna_mutant_diagonal = [
            "ATGCGA",
            "CAGTAC",
            "TTAAGT",
            "AAAAGG",
            "CCCCTA",
            "TCACTG"
        ]
        expect(hasMutantSequence(dna_mutant_diagonal)).toBe(true)
    })

    it('small dna patter should return false', () => {
        const dna_no_mutant_small = [
            "ATGC",
            "CAGT",
            "TTAA",
            "AGCT"
        ]
        expect(hasMutantSequence(dna_no_mutant_small)).toBe(false)
    })

    it('complex dna mutant patter should return false', () => {
        const dna_mutant_complex = [
            "ATGCGA",
            "CAGTGC",
            "TTATGT",
            "AGAAGG",
            "CCCCTA",
            "TCACTG"
        ]
        expect(hasMutantSequence(dna_mutant_complex)).toBe(true)
    })
})