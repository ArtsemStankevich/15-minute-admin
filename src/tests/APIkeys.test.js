import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import i18n from '../i18nTests';
import { I18nextProvider } from 'react-i18next';
import '@testing-library/jest-dom';
import Apikeys from '../components/APIkeys';

describe('Header', () => {
    it('should render without errors', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <Apikeys />
                </BrowserRouter>
            </I18nextProvider>

        );
    });
});