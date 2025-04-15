import type { Config } from 'jest';

const config: Config = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // CSS Modules or styles
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',

    // Image and asset mocks
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.ts',

    // Example for tsconfig path aliases like "@/components/..."
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/*.test.(ts|tsx)'],
};

export default config;
