import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the header with application title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Residence Card Monitor/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the setup card when no data is saved', () => {
    render(<App />);
    const setupCard = screen.getByText(/Setup Your Countdown/i);
    expect(setupCard).toBeInTheDocument();
  });

  it('renders the info card', () => {
    render(<App />);
    const infoCard = document.querySelector('.info-card');
    expect(infoCard).toBeInTheDocument();
  });
});
