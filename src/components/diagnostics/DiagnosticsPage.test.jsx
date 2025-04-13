import { asyncAssertHeadingVisible } from '../../utils/testHelperFunctions';
import DiagnosticsPage from './DiagnosticsPage';
import { customRender } from '../../mocks/customRender';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from '../../mocks/server'; // or wherever your server is defined
import { rest } from 'msw';

describe('Diagnostics Page', () => {
	test('A11y', async () => {
		const { axeTest } = customRender(<DiagnosticsPage />);
		await axeTest();
	}, 60000); // Increase timeout for slower tests.

	test('renders Diagnostics header', async () => {
		customRender(<DiagnosticsPage />);
		await asyncAssertHeadingVisible('Diagnostics');
	}, 10000);

	test('submits a question and displays the answer', async () => {
		customRender(<DiagnosticsPage />);

		// Input a question
		const inputField = screen.getByLabelText(/Input your medical question:/i);
		await userEvent.type(inputField, 'What is a headache?');

		// Submit the question
		const submitButton = screen.getByRole('button', {
			name: /Submit question/i,
		});
		await userEvent.click(submitButton);

		// Verify the answer is displayed
		await waitFor(() => {
			expect(screen.getByText('This is a mock answer.')).toBeInTheDocument();
		});
	});

	test('displays error message on API failure', async () => {
		server.use(
			rest.post('*/OpenAI', (_req, res, ctx) => {
				return res(ctx.status(500));
			})
		);

		customRender(<DiagnosticsPage />);

		// Input a question
		const inputField = screen.getByLabelText(/Input your medical question:/i);
		await userEvent.type(inputField, 'What is a fever?');

		// Submit the question
		const submitButton = screen.getByRole('button', {
			name: /Submit question/i,
		});
		await userEvent.click(submitButton);

		// Verify the error message is displayed
		await waitFor(() => {
			expect(
				screen.getByText(
					/Error accessing diagnostics service. Try again later./i
				)
			).toBeInTheDocument();
		});
	});
});
