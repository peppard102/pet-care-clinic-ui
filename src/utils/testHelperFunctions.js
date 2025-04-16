import { waitFor } from '@testing-library/dom';
import { screen, fireEvent } from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import userEvent from '@testing-library/user-event';

// #region Buttons
export const assertButtonVisible = buttonText => {
	expect(
		screen.getByRole('button', {
			name: buttonText,
		})
	).toBeVisible();
};

export const assertNumButton = (buttonText, num) => {
	// Assert the button shows up a specified number of times
	expect(
		screen.getAllByRole('button', {
			name: buttonText,
		}).length
	).toBe(num);
};

export const assertButtonNotVisible = buttonText => {
	expect(
		screen.queryByRole('button', {
			name: buttonText,
		})
	).not.toBeInTheDocument();
};

export const clickButton = async buttonText => {
	const buttonToClick = screen.getByRole('button', {
		name: buttonText,
	});

	await userEvent.click(buttonToClick);
};

export const asyncClickButton = async buttonText => {
	const buttonToClick = await screen.findByRole('button', {
		name: buttonText,
	});

	await userEvent.click(buttonToClick);
};
// #endregion

// #region Links
export const assertLinkVisible = (url, linkText) => {
	expect(screen.getByRole('link', { name: linkText })).toHaveAttribute(
		'href',
		url
	);
};

export const asyncAssertLinkVisible = async (url, linkText) => {
	expect(await screen.findByRole('link', { name: linkText })).toHaveAttribute(
		'href',
		url
	);
};

export const assertLinkNotVisible = linkText => {
	expect(
		screen.queryByRole('link', {
			name: linkText,
		})
	).not.toBeInTheDocument();
};

export const clickLink = linkText => {
	const linkToClick = screen.getByRole('link', {
		name: linkText,
	});

	fireEvent.click(linkToClick);
};
// #endregion

// #region Text
export const assertTextVisible = text => {
	expect(screen.getByText(text)).toBeVisible();
};

export const asyncAssertTextVisible = async text => {
	expect(await screen.findByText(text)).toBeVisible();
};

export const assertTextNotVisible = text => {
	expect(screen.queryByText(text)).not.toBeInTheDocument();
};

export const assertNumText = (text, num) => {
	// Assert the text shows up a specified number of times
	expect(screen.getAllByText(text).length).toBe(num);
};
// #endregion

// #region Headings
export const assertHeadingVisible = text => {
	expect(
		screen.getByRole('heading', {
			name: text,
		})
	).toBeVisible();
};

export const assertNumHeading = (text, num) => {
	// Assert the heading shows up a specified number of times
	expect(screen.getAllByRole('heading', { name: text }).length).toBe(num);
};

export const asyncAssertHeadingVisible = async text => {
	expect(
		await screen.findByRole('heading', {
			name: text,
		})
	).toBeVisible();
};
// #endregion

// #region Checkboxes
export const assertNumCheckedBoxes = numChecked => {
	const checkedCheckboxes = screen.queryAllByRole('checkbox', {
		checked: true,
	});

	expect(checkedCheckboxes.length).toBe(numChecked);
};

export const assertNumUncheckedBoxes = numUnchecked => {
	const uncheckedCheckboxes = screen.queryAllByRole('checkbox', {
		checked: false,
	});

	expect(uncheckedCheckboxes.length).toBe(numUnchecked);
};
// #endregion

// #region ListItems
export const assertNumListItems = numListItems => {
	expect(screen.queryAllByRole('listitem').length).toBe(numListItems);
};
// #endregion

// #region TestID
export const assertTestIdVisible = testId => {
	expect(screen.getByTestId(testId)).toBeVisible();
};

export const assertNumTestId = (testId, num) => {
	// Assert the testId shows up a specified number of times
	expect(screen.getAllByTestId(testId).length).toBe(num);
};

export const asyncAssertTestIdVisible = async testId => {
	expect(await screen.findByTestId(testId)).toBeVisible();
};

export const assertTestIdNotVisible = testId => {
	expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
};
// #endregion

// #region Image
export const assertImageVisible = altText => {
	expect(screen.getByRole('img')).toHaveAttribute('alt', altText);
};

export const assertImageVisibleByAltText = altText => {
	expect(screen.getByAltText(altText)).toBeVisible();
};

export const assertImageSrc = (alt, src) => {
	expect(screen.getByAltText(alt)).toHaveAttribute('src', src);
};

export const assertImageCount = count => {
	expect(screen.getAllByRole('img').length).toEqual(count);
};
// #endregion

// #region SEO
export const asyncAssertPageTitle = async text => {
	await waitFor(() => expect(document.title).toBe(text));
};

export const asyncAssertPageDescription = async text => {
	await waitFor(() =>
		expect(
			document.head
				.querySelector('meta[name=description]')
				?.attributes.getNamedItem('content')?.value
		).toBe(text)
	);
};
// #endregion

// #region Screen Size
const createMatchMedia = width => query => ({
	matches: mediaQuery.match(query, {
		width,
	}),
	media: query,
	onchange: null,
	addListener: () => {},
	removeListener: () => {},
	// Modern event listener methods used by Material UI
	addEventListener: () => {},
	removeEventListener: () => {},
	dispatchEvent: () => {},
});

export const changeScreenSize = newScreenSize => {
	// @ts-ignore
	window.matchMedia = createMatchMedia(newScreenSize);
};

// Breakpoints that can be used to test different screen sizes.
export const breakpointSmall = { size: 'small', width: '200px' };
export const breakpointMedium = { size: 'medium', width: '700px' };
export const breakpointLarge = { size: 'large', width: '1200px' };
// #endregion
