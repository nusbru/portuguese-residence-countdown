import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoCard from './InfoCard';

describe('InfoCard', () => {
  it('renders the information header', () => {
    render(<InfoCard />);
    
    expect(screen.getByText('Information')).toBeInTheDocument();
  });

  it('renders Privacy & Security section', () => {
    render(<InfoCard />);
    
    expect(screen.getByText('Privacy & Security')).toBeInTheDocument();
    expect(screen.getByText(/Complete Privacy/i)).toBeInTheDocument();
    expect(screen.getByText(/Local Storage Only/i)).toBeInTheDocument();
    expect(screen.getByText(/Offline Operation/i)).toBeInTheDocument();
  });

  it('renders Business Day Calculation section', () => {
    render(<InfoCard />);
    
    expect(screen.getByText('Business Day Calculation')).toBeInTheDocument();
    expect(screen.getByText(/Excludes Weekends/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Portuguese Holidays/i).length).toBeGreaterThan(0);
  });

  it('renders Features section', () => {
    render(<InfoCard />);
    
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText(/Real-time Updates/i)).toBeInTheDocument();
    expect(screen.getByText(/Editable Settings/i)).toBeInTheDocument();
    expect(screen.getByText(/Responsive Design/i)).toBeInTheDocument();
  });

  it('has correct structure', () => {
    render(<InfoCard />);
    
    const card = document.querySelector('.card.info-card');
    expect(card).toBeInTheDocument();
    
    const cardHeader = document.querySelector('.card-header');
    expect(cardHeader).toBeInTheDocument();
    
    const cardBody = document.querySelector('.card-body');
    expect(cardBody).toBeInTheDocument();
  });
});
