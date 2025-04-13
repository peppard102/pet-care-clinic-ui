import { formatDate, formatAddress, formatCurrency } from './helperFunctions';

describe('helperFunctions', () => {
	test('formats date', async () => {
		const formattedDate: string = formatDate('1950-01-02T00:00:00.0000000');
		expect(formattedDate).toBe('1/2/1950');

		const emptyDate: string = formatDate(undefined);
		expect(emptyDate).toBe('');
	});

	test('formats address', async () => {
		const formattedAddress: string = formatAddress(
			'1234 test st #200',
			'San Diego',
			'CA',
			'92111'
		);
		expect(formattedAddress).toBe('1234 test st #200, San Diego, CA 92111');

		const addressWithNoZipCode: string = formatAddress(
			'1234 test st',
			'San Diego',
			'CA',
			''
		);
		expect(addressWithNoZipCode).toBe('');

		const addressWithNoStreet: string = formatAddress('', 'San Diego', 'CA', '92111');
		expect(addressWithNoStreet).toBe('');
	});

	test('formats currency', async () => {
		const formattedCurrency: string = formatCurrency(31.2);
		expect(formattedCurrency).toBe('$31.20');
	});
});
