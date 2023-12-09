import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import i18n from '../i18nTests';
import { I18nextProvider } from 'react-i18next';
import '@testing-library/jest-dom';
import ApikeysCreate from '../components/ApikeysCreate';
import fetchMock from 'jest-fetch-mock';

// Mock dependencies

// Mock console.error to track errors
console.error = jest.fn();

describe('ApikeysCreate', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('ApikeysCreate render', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <ApikeysCreate />
        </BrowserRouter>
      </I18nextProvider>
    );
  });

  it('displays an error message for an invalid token', async () => {
    const onApiCreatedMock = jest.fn();

    const { getByLabelText, getByText } = render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <ApikeysCreate onApiCreated={onApiCreatedMock} />
        </BrowserRouter>
      </I18nextProvider>
    );

    // Mock user input with an invalid token
    fireEvent.change(getByLabelText(/Api Name/i), {
      target: { value: 'Test API' },
    });
    fireEvent.change(getByLabelText(/Token/i), {
      target: { value: 'invalidToken@123' },
    });

    // Trigger form submission
    const changepath = await screen.findByText(/Add Api Key/i);
    fireEvent.click(changepath);

    await waitFor(() => {
      expect(
        getByText(
          /Token must be exactly 39 characters long and consist of letters, numbers, "_" and "-"/i
        )
      );
    });
  });

  it('renders ApikeysCreate component', async () => {
    const onApiCreatedMock = jest.fn();

    const { getByLabelText, getByText } = render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <ApikeysCreate onApiCreated={onApiCreatedMock} />
        </BrowserRouter>
      </I18nextProvider>
    );

    // Mock user input
    fireEvent.change(getByLabelText(/Api Name/i), {
      target: { value: 'Test API' },
    });
    fireEvent.change(getByLabelText(/Token/i), {
      target: { value: 'testtesttesttesttesttesttesttesttesttes' },
    });

    // Mock fetch calls
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => ({}) });

    // Trigger form submission
    const changepath = await screen.findByText(/Add Api Key/i);
    fireEvent.click(changepath);

    await waitFor(() => {
      expect(onApiCreatedMock).toHaveBeenCalled();
    });
  });
});
