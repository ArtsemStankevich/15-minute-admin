import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthLogin from '../components/authorization/AuthLogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';

describe('AuthLogin', () => {
  it('renders without errors', () => {
    const setTokenMock = jest.fn(); // Create a mock function

    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={<AuthLogin setToken={setTokenMock} />}
            />
          </Routes>
        </BrowserRouter>
      </I18nextProvider>
    );

    // Your testing assertions go here
  });

  it('expect find text', async () => {
    const setTokenMock = jest.fn(); // Create a mock function

    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <AuthLogin setToken={setTokenMock} />
        </BrowserRouter>
      </I18nextProvider>
    );

    expect(screen.findByText('Please Log In'));
    expect(screen.findByText('Username'));
    expect(screen.findByText('Password'));
    expect(screen.findByText('Submit'));
  });

  it('should navigate to login and events pages', async () => {
    const setTokenMock = jest.fn();
    const initialPathname = '/login';

    // Manually set the initial pathname
    window.history.pushState({}, '', initialPathname);
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter history={history}>
          <AuthLogin setToken={setTokenMock} />
        </BrowserRouter>
      </I18nextProvider>
    );
    await waitFor(() => {
      // Check if the window location is updated after rendering
      expect(window.location.pathname).toBe('/login');
    });

    expect(screen.findByText('Please Log In'));
    // Find input fields and change their values
    const usernameInput = await screen.findByLabelText(/Username/i);
    const passwordInput = await screen.findByLabelText(/Password/i);

    fireEvent.change(usernameInput, { target: { value: 'igor' } });
    fireEvent.change(passwordInput, { target: { value: '343877' } });

    // Find and click the Submit button
    const submitButton = await screen.findByText(/Submit/i);
    fireEvent.click(submitButton);

    // Wait for the asynchronous operations to complete (e.g., fetch)
    await waitFor(() => {
      // Check if the window location is updated after successful login
      expect(window.location.pathname).toBe('/');
      // You may want to add more assertions based on the behavior of your application
    });
  });

  it('should navigate to login and events pages', async () => {
    const setTokenMock = jest.fn();
    const initialPathname = '/login';

    // Manually set the initial pathname
    window.history.pushState({}, '', initialPathname);
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter history={history}>
          <AuthLogin setToken={setTokenMock} />
        </BrowserRouter>
      </I18nextProvider>
    );

    expect(screen.findByText('Please Log In'));
    // Find input fields and change their values
    const usernameInput = await screen.findByLabelText(/Username/i);
    const passwordInput = await screen.findByLabelText(/Password/i);

    fireEvent.change(usernameInput, { target: { value: 'igor' } });
    fireEvent.change(passwordInput, { target: { value: '34387' } });

    // Find and click the Submit button
    const submitButton = await screen.findByText(/Submit/i);
    fireEvent.click(submitButton);

    // Wait for the asynchronous operations to complete (e.g., fetch)
    await waitFor(() => {
      // Check if the window location is updated after successful login
      expect(window.location.pathname).toBe('/login');
      // You may want to add more assertions based on the behavior of your application
    });
  });

  it('expect find text', async () => {
    const setTokenMock = jest.fn(); // Create a mock function
    i18n.changeLanguage('pl');

    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <AuthLogin setToken={setTokenMock} />
        </BrowserRouter>
      </I18nextProvider>
    );

    expect(screen.findByText('Proszę zalogować się'));
    expect(screen.findByText('Nazwa użytkownika'));
    expect(screen.findByText('Hasło'));
    expect(screen.findByText('Zatwierdź'));
  });
});
