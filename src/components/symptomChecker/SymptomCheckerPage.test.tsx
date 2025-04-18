import { asyncAssertHeadingVisible } from '../../utils/testHelperFunctions';
import SymptomCheckerPage from './SymptomCheckerPage';
import { customRender } from '../../mocks/customRender';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from '../../mocks/server';
import { rest } from 'msw';

describe('Symptom Checker Page', () => {
  test('A11y', async () => {
    const { axeTest } = customRender(<SymptomCheckerPage />);
    await axeTest();
  }, 60000); // Increase timeout for slower tests.

  test('renders header', async () => {
    customRender(<SymptomCheckerPage />);
    await asyncAssertHeadingVisible('Symptom Checker');
  }, 10000);

  test('submits a question and displays the answer', async () => {
    customRender(<SymptomCheckerPage />);

    // Input a question
    const inputField = screen.getByLabelText(/Input the pets symptoms:/i);
    await userEvent.type(inputField, 'Seizures');

    // Submit the question
    const submitButton = screen.getByRole('button', {
      name: /Get action plan/i,
    });
    await userEvent.click(submitButton);

    // Verify the answer is displayed
    await waitFor(() => {
      expect(
        screen.getByText('This is a mock action plan.')
      ).toBeInTheDocument();
    });
  });

  test('displays error message on API failure', async () => {
    server.use(
      rest.post('*/SymptomChecker', (_req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    customRender(<SymptomCheckerPage />);

    // Input a question
    const inputField = screen.getByLabelText(/Input the pets symptoms:/i);
    await userEvent.type(inputField, 'Seizures');

    // Submit the question
    const submitButton = screen.getByRole('button', {
      name: /Get action plan/i,
    });
    await userEvent.click(submitButton);

    // Verify the error message is displayed
    await waitFor(() => {
      expect(
        screen.getByText(
          /Error accessing symptom checker service. Try again later./i
        )
      ).toBeInTheDocument();
    });
  });
});
