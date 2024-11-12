/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
    collectCoverageFrom: [
        'src/**',
        '!src/app.module.ts',
        '!db/**',
        '!src/main.ts',
        '!src/modules/**'
    ],
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        }
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    modulePaths: ['<rootDir>'],
    modulePathIgnorePatterns: [],
    preset: 'ts-jest',
    rootDir: './',
    testEnvironment: 'node',
    testRegex: '.*\\.test\\.ts',
    transform: { '.*\\.(t|j)s.$': 'ts-jest' }
}