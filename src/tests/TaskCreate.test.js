import React from 'react';
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
import TaskCreate from '../components/TaskCreate';
import fetchMock from 'jest-fetch-mock';
import userEvent from '@testing-library/user-event';

describe('TaskCreate', () => {
  const username = 'igor';
  const password = '343877';

  async function loginUser() {
    return fetch('https://15minadmin.1213213.xyz/users/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(async response => {
        const data = await response.json();
        return data.access;
      })
      .catch(error => {
        setLoginError(error.message);
        throw error;
      });
  }

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should render without errors', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <TaskCreate />
        </BrowserRouter>
      </I18nextProvider>
    );
  });

  it('renders without crashing', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <TaskCreate />
        </BrowserRouter>
      </I18nextProvider>
    );
    expect(screen.getByText('Create New Task')).toBeInTheDocument();
  });

  it('should render the ship cards with fetched data', async () => {
    const token = await loginUser();

    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(),
        Authorization: `Bearer ${token}`,
      })
    );

    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <TaskCreate />
        </BrowserRouter>
      </I18nextProvider>
    );
    expect(global.fetch).toHaveBeenCalledTimes(4);
  });

  it('renders without crashing', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <TaskCreate />
        </BrowserRouter>
      </I18nextProvider>
    );
    expect(screen.getByText('Choose an API key')).toBeInTheDocument();
    expect(screen.getByText('Choose Coordinates')).toBeInTheDocument();
    expect(screen.getByText('Choose Schedule')).toBeInTheDocument();
    expect(screen.getByText('Create New Task')).toBeInTheDocument();
  });

  it('displays an error message for an invalid token', async () => {
    const onTaskCreatedMock = jest.fn();

    const { getByLabelText, getByText } = render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <TaskCreate onTaskCreated={onTaskCreatedMock} />
        </BrowserRouter>
      </I18nextProvider>
    );

    const changepath = await screen.findByText(/Add Task/i);
    fireEvent.click(changepath);

    await waitFor(() => {
      expect(getByText(/Please fill in all required fields./i));
    });
  });
});
