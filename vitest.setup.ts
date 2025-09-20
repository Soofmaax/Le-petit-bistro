import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock lottie-react to avoid jsdom canvas issues
vi.mock('lottie-react', () => {
  return {
    default: () => null
  };
});

// Mock canvas-confetti to a no-op
vi.mock('canvas-confetti', () => {
  return {
    default: () => undefined
  };
});

// Provide a minimal getContext to avoid errors from libraries that access canvas
if (!HTMLCanvasElement.prototype.getContext) {
  // eslint-disable-next-line no-extend-native
  HTMLCanvasElement.prototype.getContext = (() => ({})) as any;
}