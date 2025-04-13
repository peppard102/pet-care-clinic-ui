// Returns a new date in the form of MM/DD/YYYY
export const formatDate = dateString =>
	dateString ? new Date(dateString).toLocaleDateString() : '';

// Returns either a formatted address or an empty string if any of the essential fields are blank.
export const formatAddress = (street, city, state, zipCode) => {
	const missingAddressField = !(street && city && state && zipCode); // All fields are essential except address2.

	return missingAddressField ? '' : `${street}, ${city}, ${state} ${zipCode}`;
};

// Convert decimal number into currency format.
export const formatCurrency = decimalNumber => {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	return formatter.format(decimalNumber);
};
