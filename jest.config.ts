export default {
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: 'src',
    testRegex: '.*\\.test\\.tsx$',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/$1',
    },
    testEnvironment: 'node',
};
