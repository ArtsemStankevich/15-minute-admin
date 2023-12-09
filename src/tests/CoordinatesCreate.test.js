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
import CoordinatesCreate from '../components/CoordinatesCreate';
import fetchMock from 'jest-fetch-mock';

// Mock dependencies

// Mock console.error to track errors
console.error = jest.fn();

describe('CoordinatesCreate', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('CoordinatesCreate render', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <CoordinatesCreate />
        </BrowserRouter>
      </I18nextProvider>
    );
  });

  it('displays an error message for an invalid token', async () => {
    const onCoordinatesCreatedMock = jest.fn();

    const { getByLabelText, getByText } = render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <CoordinatesCreate onCoordinateCreated={onCoordinatesCreatedMock} />
        </BrowserRouter>
      </I18nextProvider>
    );

    // Mock user input with an invalid token
    fireEvent.change(getByLabelText(/Coordinates Name/i), {
      target: { value: 'TestName' },
    });
    fireEvent.change(getByLabelText(/Latitude/i), { target: { value: '100' } });
    fireEvent.change(getByLabelText(/Longitude/i), {
      target: { value: '10000' },
    });
    fireEvent.change(getByLabelText(/Radius/i), { target: { value: '100' } });

    // Trigger form submission
    const changepath = await screen.findByText(/Add Coordinate/i);
    fireEvent.click(changepath);

    await waitFor(() => {
      expect(
        getByText(
          /Invalid latitude or longitude values. Latitude should be in the range -90 to 90, and longitude should be in the range -180 to 180./i
        )
      );
    });
  });

  it('renders CoordinatesCreate component', async () => {
    const onCoordinatesCreatedMock = jest.fn();

    const { getByLabelText, getByText } = render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <CoordinatesCreate onCoordinateCreated={onCoordinatesCreatedMock} />
        </BrowserRouter>
      </I18nextProvider>
    );

    fireEvent.change(getByLabelText(/Coordinates Name/i), {
      target: { value: 'TestName' },
    });
    fireEvent.change(getByLabelText(/Latitude/i), { target: { value: '50' } });
    fireEvent.change(getByLabelText(/Longitude/i), { target: { value: '50' } });
    fireEvent.change(getByLabelText(/Radius/i), { target: { value: '1000' } });

    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => ({}) });

    // Trigger form submission
    const changepath = await screen.findByText(/Add Coordinate/i);
    fireEvent.click(changepath);

    await waitFor(() => {
      expect(onCoordinatesCreatedMock).toHaveBeenCalled();
    });
  });
});
