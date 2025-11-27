import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoItem from './InfoItem';

describe('InfoItem', () => {
  it('renders label and value correctly', () => {
    render(
      <InfoItem icon="fas fa-calendar" label="Date" value="December 25, 2024" />
    );
    
    expect(screen.getByText('Date:')).toBeInTheDocument();
    expect(screen.getByText('December 25, 2024')).toBeInTheDocument();
  });

  it('renders with correct icon class', () => {
    render(
      <InfoItem icon="fas fa-check" label="Status" value="Complete" />
    );
    
    const icon = document.querySelector('.info-item i');
    expect(icon).toHaveClass('fas', 'fa-check');
  });

  it('applies custom className to value', () => {
    render(
      <InfoItem 
        icon="fas fa-info" 
        label="Status" 
        value="Active" 
        className="status-active" 
      />
    );
    
    const valueSpan = screen.getByText('Active');
    expect(valueSpan).toHaveClass('status-active');
  });

  it('has correct structure', () => {
    render(
      <InfoItem icon="fas fa-test" label="Test" value="Value" />
    );
    
    const infoItem = document.querySelector('.info-item');
    expect(infoItem).toBeInTheDocument();
  });
});
