import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import App from '../App';

describe('App', () => {
  it('renders without errors', () => {
    render(
        <App />
    );
  });
});