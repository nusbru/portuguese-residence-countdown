import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the application title', () => {
    render(<Header />);
    
    const title = screen.getByText('Residence Card Monitor');
    expect(title).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Header />);
    
    const subtitle = screen.getByText('Track your Portuguese residence authorization');
    expect(subtitle).toBeInTheDocument();
  });

  it('renders the logo icon', () => {
    render(<Header />);
    
    const logo = document.querySelector('.logo i');
    expect(logo).toHaveClass('fas', 'fa-id-card');
  });

  it('has correct structure', () => {
    render(<Header />);
    
    const header = document.querySelector('.header');
    expect(header).toBeInTheDocument();
    
    const headerContent = document.querySelector('.header-content');
    expect(headerContent).toBeInTheDocument();
    
    const logoDiv = document.querySelector('.logo');
    expect(logoDiv).toBeInTheDocument();
  });
});
