import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import './src/i18n';

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
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    configurable: true,
    writable: true,
    value: function (): RenderingContext | null {
      // Return a minimal object that satisfies libraries checking for a context
      return {} as unknown as RenderingContext;
    }
  });
}

// Polyfill IntersectionObserver for framer-motion InView in tests
const g = globalThis as unknown as { IntersectionObserver?: typeof IntersectionObserver };
if (typeof g.IntersectionObserver === 'undefined') {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '0px';
    readonly thresholds: ReadonlyArray<number> = [0];

    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      // mark as used to satisfy lint
      void callback;
      void options;
    }

    observe(target: Element) {
      void target;
    }

    unobserve(target: Element) {
      void target;
    }

    disconnect() {}

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  g.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
}