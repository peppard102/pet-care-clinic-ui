import { screen } from '@testing-library/react';
import App from './App';
import { customRender } from './mocks/customRender';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('Can navigate to all the pages', async () => {
	customRender(<App />);

	// Vets page should display by default
	await waitFor(
		() => {
			const vetsHeader = screen.getByRole('heading', {
				name: /vets/i,
			});
			expect(vetsHeader).toBeInTheDocument();
		},
		{
			timeout: 5000,
		}
	);

	// Click the pets button and check if the Pets page is displayed
	await userEvent.click(screen.getByRole('button', { name: /pets/i }));
	await waitFor(() => {
		const petsText = screen.getByRole('heading', {
			name: /pets/i,
		});
		expect(petsText).toBeInTheDocument();
	});

	// Click the vets button and check if the Vets page is displayed
	await userEvent.click(screen.getByRole('button', { name: /vets/i }));
	await waitFor(() => {
		const vetsText = screen.getByRole('heading', {
			name: /vets/i,
		});
		expect(vetsText).toBeInTheDocument();
	});

	// Click the diagnostics button and check if the Diagnostics page is displayed
	await userEvent.click(screen.getByRole('button', { name: /diagnostics/i }));
	await waitFor(() => {
		const diagnosticsText = screen.getByRole('heading', {
			name: /diagnostics/i,
		});
		expect(diagnosticsText).toBeInTheDocument();
	});

	// Click the homepage icon and check if the Vets page is displayed
	await userEvent.click(screen.getByRole('button', { name: /menu/i }));
	await waitFor(() => {
		const vetsText = screen.getByRole('heading', {
			name: /vets/i,
		});
		expect(vetsText).toBeInTheDocument();
	});
}, 10000); // Increase timeout for slower tests.
