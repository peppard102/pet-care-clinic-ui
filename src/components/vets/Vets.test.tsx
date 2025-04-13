import { asyncAssertHeadingVisible } from '../../utils/testHelperFunctions';
import VetsPage from './VetsPage';
import { customRender } from '../../mocks/customRender';

describe('Vets Page', () => {
	test('A11y', async () => {
		const { axeTest } = customRender(<VetsPage />);
		await axeTest();
	}, 60000); // Increase timeout for slower tests.

	test('renders vets header', async () => {
		customRender(<VetsPage />);
		await asyncAssertHeadingVisible('Vets');
	}, 10000);
});
