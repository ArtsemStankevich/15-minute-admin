import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import i18n from '../i18nTests';
import Header from '../components/Header';
import { I18nextProvider } from 'react-i18next';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('should render without errors', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </I18nextProvider>
    );
  });

  it('should render without errors', async () => {
    const initialPathname = '/tasks';

    // Manually set the initial pathname
    window.history.pushState({}, '', initialPathname);
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </I18nextProvider>
    );

    await waitFor(() => {
      // Check if the window location is updated after rendering
      expect(window.location.pathname).toBe('/tasks');
    });
    const changepath = await screen.findByText(/Coordinates/i);
    fireEvent.click(changepath);
    await waitFor(() => {
      // Check if the window location is updated after successful login
      expect(window.location.pathname).toBe('/coordinates');
      // You may want to add more assertions based on the behavior of your application
    });
  });
  it('should render without errors', async () => {
    const initialPathname = '/tasks';

    // Manually set the initial pathname
    window.history.pushState({}, '', initialPathname);
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </I18nextProvider>
    );

    await waitFor(() => {
      // Check if the window location is updated after rendering
      expect(window.location.pathname).toBe('/tasks');
    });
    const changepath = await screen.findByText(/API keys/i);
    fireEvent.click(changepath);
    await waitFor(() => {
      // Check if the window location is updated after successful login
      expect(window.location.pathname).toBe('/apikeys');
      // You may want to add more assertions based on the behavior of your application
    });
  });
  it('should render without errors', async () => {
    const initialPathname = '/tasks';

    // Manually set the initial pathname
    window.history.pushState({}, '', initialPathname);
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </I18nextProvider>
    );

    await waitFor(() => {
      // Check if the window location is updated after rendering
      expect(window.location.pathname).toBe('/tasks');
    });
    const changepath = await screen.findByText(/Tasks/i);
    fireEvent.click(changepath);
    await waitFor(() => {
      // Check if the window location is updated after successful login
      expect(window.location.pathname).toBe('/tasks');
      // You may want to add more assertions based on the behavior of your application
    });
  });
  it('should render without errors', async () => {
    const initialPathname = '/tasks';

    // Manually set the initial pathname
    window.history.pushState({}, '', initialPathname);
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </I18nextProvider>
    );

    await waitFor(() => {
      // Check if the window location is updated after rendering
      expect(window.location.pathname).toBe('/tasks');
    });
    const changepath = await screen.findByText(/Schedule/i);
    fireEvent.click(changepath);
    await waitFor(() => {
      // Check if the window location is updated after successful login
      expect(window.location.pathname).toBe('/schedule');
      // You may want to add more assertions based on the behavior of your application
    });
  });

  it('should render without errors', async () => {
    // Manually set the initial pathname
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </I18nextProvider>
    );

    const tasks = screen.getByText('Tasks');
    const ApiKeys = screen.getByText('API Keys');
    const Coordinates = screen.getByText('Coordinates');
    const Schedule = screen.getByText('Schedule');
  });

  it('should render without errors', async () => {
    i18n.changeLanguage('pl');
    // Manually set the initial pathname
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </I18nextProvider>
    );

    const tasks = screen.getByText('Zadania');
    const ApiKeys = screen.getByText('Klucze API');
    const Coordinates = screen.getByText('Współrzędne');
    const Schedule = screen.getByText('Harmonogram');
  });

  it('should render without errors', async () => {
    const initialPathname = '/tasks';
    i18n.changeLanguage('en');

    // Manually set the initial pathname
    window.history.pushState({}, '', initialPathname);
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </I18nextProvider>
    );

    await waitFor(() => {
      // Check if the window location is updated after rendering
      expect(window.location.pathname).toBe('/tasks');
    });
    const changepath = await screen.findByText(/LogOut/i);
    fireEvent.click(changepath);
    await waitFor(() => {
      // Check if the window location is updated after successful login
      expect(window.location.pathname).toBe('/login');
      // You may want to add more assertions based on the behavior of your application
    });
  });

  it('should render without errors', async () => {
    const initialPathname = '/tasks';

    // Manually set the initial pathname
    window.history.pushState({}, '', initialPathname);

    i18n.changeLanguage('pl');
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </I18nextProvider>
    );

    await waitFor(() => {
      // Check if the window location is updated after rendering
      expect(window.location.pathname).toBe('/tasks');
    });

    const changepath = await screen.findByText(/Wyloguj/i);
    fireEvent.click(changepath);
    await waitFor(() => {
      // Check if the window location is updated after successful login
      expect(window.location.pathname).toBe('/login');
      // You may want to add more assertions based on the behavior of your application
    });
  });
});
