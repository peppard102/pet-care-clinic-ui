import {
	asyncAssertHeadingVisible,
	assertTextVisible,
	asyncClickButton,
	changeScreenSize,
} from '../../utils/testHelperFunctions';
import PetsPage from './PetsPage';
import { customRender } from '../../mocks/customRender';
import { screen } from '@testing-library/react';

describe('Pets Page', () => {
	test('A11y', async () => {
		const { axeTest } = customRender(<PetsPage />);
		await axeTest();
	}, 60000); // Increase timeout for slower tests.

	test('renders the page title and data grid with pet information', async () => {
		customRender(<PetsPage />);

		await asyncAssertHeadingVisible('Pets');
		assertTextVisible('Sophie');
		assertTextVisible('Nico');
	});
	
	test('renders the autocomplete on smaller screens', async () => {
		changeScreenSize('400px');
		customRender(<PetsPage />);
		
		await asyncAssertHeadingVisible('Pets');
		
		// Check that the autocomplete is rendered
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	test('opens the Add Pet modal when Add New Pet button is clicked', async () => {
		customRender(<PetsPage />);

		await asyncClickButton('Add New Pet');
		assertTextVisible('Add a new pet:');
	});
});
