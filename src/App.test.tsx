import { screen } from '@testing-library/react';
import App from './App';
import { customRender } from './mocks/customRender';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('Can navigate to all the pages', async () => {
  customRender(<App />);

  // Symptom Checker page should display by default
  await waitFor(
    () => {
      const symptomCheckerHeader = screen.getByRole('heading', {
        name: /symptom checker/i,
      });
      expect(symptomCheckerHeader).toBeInTheDocument();
    },
    {
      timeout: 5000,
    }
  );

  // Click the pets button and check if the Pets page is displayed
  await userEvent.click(screen.getByRole('button', { name: /pets/i }));
  await waitFor(
    () => {
      const petsText = screen.getByRole('heading', {
        name: /pets/i,
      });
      expect(petsText).toBeInTheDocument();
    },
    {
      timeout: 5000,
    }
  );

  // Click the vets button and check if the Vets page is displayed
  await userEvent.click(screen.getByRole('button', { name: /vets/i }));
  await waitFor(() => {
    const vetsText = screen.getByRole('heading', {
      name: /vets/i,
    });
    expect(vetsText).toBeInTheDocument();
  });

  // Click the General Questions button and check if the General Questions page is displayed
  await userEvent.click(
    screen.getByRole('button', { name: /General Questions/i })
  );
  await waitFor(() => {
    const generalQuestionsText = screen.getByRole('heading', {
      name: /General Questions/i,
    });
    expect(generalQuestionsText).toBeInTheDocument();
  });

  // Click the homepage icon and check if the Symptom Checker page is displayed
  await userEvent.click(screen.getByRole('button', { name: /homepage/i }));
  await waitFor(() => {
    const symptomCheckerText = screen.getByRole('heading', {
      name: /symptom checker/i,
    });
    expect(symptomCheckerText).toBeInTheDocument();
  });
}, 10000); // Increase timeout for slower tests.
