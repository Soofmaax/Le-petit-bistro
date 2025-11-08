import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      // Focus coverage on critical logic; exclude purely presentational/static files
      include: [
        'src/components/Reservation.tsx',
        'src/components/reservation/**',
        'src/components/Header.tsx',
        'src/components/Analytics.tsx',
        'src/services/**',
        'src/hooks/**'
      ],
      exclude: [
        'src/__tests__/**',
        '**/*.test.*',
        'vitest.setup.ts',
        'src/i18n/**',
        'src/types/**',
        'src/mocks/**',
        'src/data/**',
        'src/api/**',
        'src/components/legal/**',
        'src/components/{About,Contact,Footer,Hero,Menu,SEO,CookieConsent}.tsx'
      ],
      thresholds: {
        lines: 75,
        branches: 65,
        functions: 75,
        statements: 75
      }
    }
  }
});