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
if (typeof (globalThis as any).IntersectionObserver === 'undefined') {
  class MockIntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '0px';
    readonly thresholds: ReadonlyArray<number> = [0];

    constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}

    observe(_target: Element) {}
    unobserve(_target: Element) {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] { return []; }
  }
  (globalThis as any).IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
}