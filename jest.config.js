/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^app/(.*)$': '<rootDir>/src/app/$1',
		'^features/(.*)$': '<rootDir>/src/features/$1',
		'^common/(.*)$': '<rootDir>/src/common/$1',
	},
};