import { waitFor } from '@testing-library/dom';
import { screen, fireEvent } from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import userEvent from '@testing-library/user-event';

// #region Buttons
export const assertButtonVisible = (buttonText: string): void => {
	expect(
		screen.getByRole('button', {
			name: buttonText,
		})
	).toBeVisible();
};

export const assertNumButton = (buttonText: string, num: number): void => {
	// Assert the button shows up a specified number of times
	expect(
		screen.getAllByRole('button', {
			name: buttonText,
		}).length
	).toBe(num);
};

export const assertButtonNotVisible = (buttonText: string): void => {
	expect(
		screen.queryByRole('button', {
			name: buttonText,
		})
	).not.toBeInTheDocument();
};

export const clickButton = async (buttonText: string): Promise<void> => {
	const buttonToClick = screen.getByRole('button', {
		name: buttonText,
	});

	await userEvent.click(buttonToClick);
};

export const asyncClickButton = async (buttonText: string): Promise<void> => {
	const buttonToClick = await screen.findByRole('button', {
		name: buttonText,
	});

	await userEvent.click(buttonToClick);
};
// #endregion

// #region Links
export const assertLinkVisible = (url: string, linkText: string): void => {
	expect(screen.getByRole('link', { name: linkText })).toHaveAttribute(
		'href',
		url
	);
};

export const asyncAssertLinkVisible = async (url: string, linkText: string): Promise<void> => {
	expect(await screen.findByRole('link', { name: linkText })).toHaveAttribute(
		'href',
		url
	);
};

export const assertLinkNotVisible = (linkText: string): void => {
	expect(
		screen.queryByRole('link', {
			name: linkText,
		})
	).not.toBeInTheDocument();
};

export const clickLink = (linkText: string): void => {
	const linkToClick = screen.getByRole('link', {
		name: linkText,
	});

	fireEvent.click(linkToClick);
};
// #endregion

// #region Text
export const assertTextVisible = (text: string): void => {
	expect(screen.getByText(text)).toBeVisible();
};

export const asyncAssertTextVisible = async (text: string): Promise<void> => {
	expect(await screen.findByText(text)).toBeVisible();
};

export const assertTextNotVisible = (text: string): void => {
	expect(screen.queryByText(text)).not.toBeInTheDocument();
};

export const assertNumText = (text: string, num: number): void => {
	// Assert the text shows up a specified number of times
	expect(screen.getAllByText(text).length).toBe(num);
};
// #endregion

// #region Headings
export const assertHeadingVisible = (text: string): void => {
	expect(
		screen.getByRole('heading', {
			name: text,
		})
	).toBeVisible();
};

export const assertNumHeading = (text: string, num: number): void => {
	// Assert the heading shows up a specified number of times
	expect(screen.getAllByRole('heading', { name: text }).length).toBe(num);
};

export const asyncAssertHeadingVisible = async (text: string): Promise<void> => {
	expect(
		await screen.findByRole('heading', {
			name: text,
		})
	).toBeVisible();
};
// #endregion

// #region Checkboxes
export const assertNumCheckedBoxes = (numChecked: number): void => {
	const checkedCheckboxes = screen.queryAllByRole('checkbox', {
		checked: true,
	});

	expect(checkedCheckboxes.length).toBe(numChecked);
};

export const assertNumUncheckedBoxes = (numUnchecked: number): void => {
	const uncheckedCheckboxes = screen.queryAllByRole('checkbox', {
		checked: false,
	});

	expect(uncheckedCheckboxes.length).toBe(numUnchecked);
};
// #endregion

// #region ListItems
export const assertNumListItems = (numListItems: number): void => {
	expect(screen.queryAllByRole('listitem').length).toBe(numListItems);
};
// #endregion

// #region TestID
export const assertTestIdVisible = (testId: string): void => {
	expect(screen.getByTestId(testId)).toBeVisible();
};

export const assertNumTestId = (testId: string, num: number): void => {
	// Assert the testId shows up a specified number of times
	expect(screen.getAllByTestId(testId).length).toBe(num);
};

export const asyncAssertTestIdVisible = async (testId: string): Promise<void> => {
	expect(await screen.findByTestId(testId)).toBeVisible();
};

export const assertTestIdNotVisible = (testId: string): void => {
	expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
};
// #endregion

// #region Image
export const assertImageVisible = (altText: string): void => {
	expect(screen.getByRole('img')).toHaveAttribute('alt', altText);
};

export const assertImageVisibleByAltText = (altText: string): void => {
	expect(screen.getByAltText(altText)).toBeVisible();
};

export const assertImageSrc = (alt: string, src: string): void => {
	expect(screen.getByAltText(alt)).toHaveAttribute('src', src);
};

export const assertImageCount = (count: number): void => {
	expect(screen.getAllByRole('img').length).toEqual(count);
};
// #endregion

// #region SEO
export const asyncAssertPageTitle = async (text: string): Promise<void> => {
	await waitFor(() => expect(document.title).toBe(text));
};

export const asyncAssertPageDescription = async (text: string): Promise<void> => {
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
type MatchMediaReturnType = {
	matches: boolean;
	media: string;
	onchange: null;
	addListener: () => void;
	removeListener: () => void;
	addEventListener: () => void;
	removeEventListener: () => void;
	dispatchEvent: () => boolean;
};

const createMatchMedia = (width: string) => (query: string): MatchMediaReturnType => ({
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
	dispatchEvent: () => true,
});

export const changeScreenSize = (newScreenSize: string): void => {
	window.matchMedia = createMatchMedia(newScreenSize);
};

interface Breakpoint {
	size: string;
	width: string;
}

// Breakpoints that can be used to test different screen sizes.
export const breakpointSmall: Breakpoint = { size: 'small', width: '200px' };
export const breakpointMedium: Breakpoint = { size: 'medium', width: '700px' };
export const breakpointLarge: Breakpoint = { size: 'large', width: '1200px' };
// #endregion
