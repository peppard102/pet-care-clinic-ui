import { render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import QueryClientProvider from '../components/shared/QueryClientProvider';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HelmetProvider } from 'react-helmet-async';

expect.extend(toHaveNoViolations);

export const customRender = component => {
	const { container } = render(
		<MemoryRouter initialEntries={['/']}>
			<QueryClientProvider>
				<HelmetProvider>{component}</HelmetProvider>
			</QueryClientProvider>
		</MemoryRouter>
	);

	return {
		// Call this to make sure that there are no A11y violations.
		axeTest: async () =>
			act(async () => expect(await axe(container)).toHaveNoViolations()),
	};
};
