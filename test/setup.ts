import {afterEach, vi} from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { server } from '../src/mocks/server';

// Establish API mocking before all tests.
beforeAll(() => {
	server.listen({
		onUnhandledRequest: 'error', // Make it blow up if the handlers file doesn't have our API endpoint.
	});
});

// Clean up after the tests are finished.
afterAll(() => server.close());

afterEach(() => {
  // Reset any request handlers that we may add during the tests so they don't affect other tests.
  server.resetHandlers()
  cleanup();
  vi.clearAllMocks();
});
