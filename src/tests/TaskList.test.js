import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import i18n from '../i18nTests';
import { I18nextProvider } from 'react-i18next';
import '@testing-library/jest-dom';
import TaskList from '../components/TaskList';

describe('TaskList', () => {

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
        .then(async (response) => {
          const data = await response.json();
          return data.access;
        })
        .catch((error) => {
          setLoginError(error.message);
          throw error;
        });
    }

    it('should render without errors', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <TaskList />
                </BrowserRouter>
            </I18nextProvider>

        );
    });

    it('renders TaskList component', async () => {

        render(
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <TaskList />
                </BrowserRouter>
            </I18nextProvider>
    
        );
    
        // You may need to add more specific queries based on your component structure
        const placeNameHeader = await screen.findByText(/Place name/i);
        const coordinateHeader = await screen.findAllByText(/Coordinate/i);
        const repeatEveryHeader = await screen.findByText(/Repeat every/i);
        const tokenHeader = await screen.findByText(/Token/i);
        const startHeader = await screen.findByText(/Start/i);
        const latestStatusHeader = await screen.findByText(/Latest status/i);
    
        expect(placeNameHeader).toBeInTheDocument();
        expect(repeatEveryHeader).toBeInTheDocument();
        expect(tokenHeader).toBeInTheDocument();
        expect(startHeader).toBeInTheDocument();
        expect(latestStatusHeader).toBeInTheDocument();
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
              <TaskList />
            </BrowserRouter>
          </I18nextProvider>
        );
        expect(global.fetch).toHaveBeenCalledTimes(5);
      });
      
    
});
