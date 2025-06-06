import { asyncAssertHeadingVisible } from '../../utils/testHelperFunctions';
import GeneralQuestionsPage from './GeneralQuestionsPage';
import { customRender } from '../../mocks/customRender';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';

describe('GeneralQuestionsPage', () => {
  test('A11y', async () => {
    const { axeTest } = customRender(<GeneralQuestionsPage />);
    await axeTest();
  }, 60000); // Increase timeout for slower tests.

  test('renders header', async () => {
    customRender(<GeneralQuestionsPage />);
    await asyncAssertHeadingVisible('General Medical Questions');
  }, 10000);

  test('submits a question and displays the answer', async () => {
    customRender(<GeneralQuestionsPage />);

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
      http.post('*/GeneralQuestions', () => {
        return HttpResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 }
        );
      })
    );

    customRender(<GeneralQuestionsPage />);

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
          /Error accessing general questions service. Try again later./i
        )
      ).toBeInTheDocument();
    });
  });
});
