import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PetsSearch from './PetsSearch';
import { customRender } from '../../mocks/customRender';

describe('PetsSearch Component', () => {
  const mockOpenAddPetModal = vi.fn();

  test('calls openAddPetModal when Add New Pet button is clicked', async () => {
    customRender(<PetsSearch openAddPetModal={mockOpenAddPetModal} />);

    const addButton = await screen.findByText('Add New Pet');
    await userEvent.click(addButton);

    expect(mockOpenAddPetModal).toHaveBeenCalledTimes(1);
  });

  test('displays pet details when a pet is selected from the dropdown', async () => {
    customRender(<PetsSearch openAddPetModal={mockOpenAddPetModal} />);

    // Open the autocomplete dropdown
    const autocomplete = await screen.findByLabelText('Search Pets');
    await userEvent.click(autocomplete);

    // Select the first pet from the dropdown
    const firstPetOption = screen.getByText('Sophie Snow');
    await userEvent.click(firstPetOption);

    // Check if pet details are displayed
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Sophie Snow')).toBeInTheDocument();

    expect(screen.getByText('Date of birth:')).toBeInTheDocument();
    expect(screen.getByText('3/14/2009')).toBeInTheDocument();

    expect(screen.getByText('Address:')).toBeInTheDocument();
    expect(
      screen.getByText('123 Pine Lane, Frostville, WI 54321')
    ).toBeInTheDocument();
  });
});
