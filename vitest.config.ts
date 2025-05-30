import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        'src/mocks/browser.ts',
        'src/utils/testHelperFunctions.ts',
        'src/types/**',
        'src/vite-env.d.ts',
        'src/main.tsx',
      ],
    },
  },
});
