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
import ScheduleCreate from '../components/ScheduleCreate';
import fetchMock from 'jest-fetch-mock';

// Mock dependencies

// Mock console.error to track errors
console.error = jest.fn();

describe('ScheduleCreate', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('ScheduleCreate render', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <ScheduleCreate />
        </BrowserRouter>
      </I18nextProvider>
    );
  });

  it('displays an error message for an invalid token', async () => {
    const onScheduleCreatedMock = jest.fn();

    const { getByLabelText, getByText } = render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <ScheduleCreate onScheduleCreated={onScheduleCreatedMock} />
        </BrowserRouter>
      </I18nextProvider>
    );

    // Mock user input with an invalid token
    fireEvent.change(getByLabelText(/Minute/i), { target: { value: '1' } });
    fireEvent.change(getByLabelText(/Hour/i), { target: { value: '-1' } });
    fireEvent.change(getByLabelText(/Day of week/i), {
      target: { value: '1' },
    });
    fireEvent.change(getByLabelText(/Day of Month/i), {
      target: { value: '11' },
    });
    fireEvent.change(getByLabelText(/Month of Year/i), {
      target: { value: '11' },
    });

    // Trigger form submission
    const changepath = await screen.findByText(/Add Schedule/i);
    fireEvent.click(changepath);

    await waitFor(() => {
      expect(getByText(/Incorrect data/i));
    });
  });

  it('renders ApikeysCreate component', async () => {
    const onScheduleCreatedMock = jest.fn();

    const { getByLabelText, getByText } = render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <ScheduleCreate onScheduleCreated={onScheduleCreatedMock} />
        </BrowserRouter>
      </I18nextProvider>
    );

    fireEvent.change(getByLabelText(/Minute/i), { target: { value: '1' } });
    fireEvent.change(getByLabelText(/Hour/i), { target: { value: '1' } });
    fireEvent.change(getByLabelText(/Day of week/i), {
      target: { value: '1' },
    });
    fireEvent.change(getByLabelText(/Day of Month/i), {
      target: { value: '1' },
    });
    fireEvent.change(getByLabelText(/Month of Year/i), {
      target: { value: '1' },
    });

    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => ({}) });

    // Trigger form submission
    const changepath = await screen.findByText(/Add Schedule/i);
    fireEvent.click(changepath);

    await waitFor(() => {
      expect(onScheduleCreatedMock).toHaveBeenCalled();
    });
  });
});
