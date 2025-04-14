import { render, act, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import QueryClientProvider from '../components/shared/QueryClientProvider';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HelmetProvider } from 'react-helmet-async';
import { ReactElement } from 'react';

expect.extend(toHaveNoViolations);

interface CustomRenderResult extends RenderResult {
  axeTest: () => Promise<void>;
}

export const customRender = (component: ReactElement): CustomRenderResult => {
	const { container, ...rest } = render(
		<MemoryRouter initialEntries={['/']}>
			<QueryClientProvider>
				<HelmetProvider>{component}</HelmetProvider>
			</QueryClientProvider>
		</MemoryRouter>
	);

	return {
		...rest,
		container,
		// Call this to make sure that there are no A11y violations.
		axeTest: async () =>
			act(async () => expect(await axe(container)).toHaveNoViolations()),
	};
};
