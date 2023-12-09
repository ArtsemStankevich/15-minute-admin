import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import i18n from '../i18nTests';
import { I18nextProvider } from 'react-i18next';
import '@testing-library/jest-dom';
import ApikeysList from '../components/ApikeysList';

describe('ApikeysList', () => {
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

  it('ApikeysList render', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <ApikeysList />
        </BrowserRouter>
      </I18nextProvider>
    );
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
          <ApikeysList />
        </BrowserRouter>
      </I18nextProvider>
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
