import { render, screen } from '@testing-library/react';
import ServerErrorPage from './ServerErrorPage';

describe('ServerErrorPage', () => {
	it('renders the server error message', () => {
		render(<ServerErrorPage />);
		const errorMessage = screen.getByText(/Sorry! There was a server error./i);
		expect(errorMessage).toBeInTheDocument();
	});
});
