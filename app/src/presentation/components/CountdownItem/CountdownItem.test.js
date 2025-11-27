import React from 'react';
import { render, screen } from '@testing-library/react';
import CountdownItem from './CountdownItem';

describe('CountdownItem', () => {
  it('renders value and label correctly', () => {
    render(<CountdownItem value={42} label="Days Left" />);
    
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Days Left')).toBeInTheDocument();
  });

  it('renders string value correctly', () => {
    render(<CountdownItem value="50%" label="Progress" />);
    
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  it('applies updated class when animated prop is true', () => {
    render(<CountdownItem value={10} label="Test" animated={true} />);
    
    const numberElement = document.querySelector('.countdown-number');
    expect(numberElement).toHaveClass('updated');
  });

  it('does not apply updated class when animated prop is false', () => {
    render(<CountdownItem value={10} label="Test" animated={false} />);
    
    const numberElement = document.querySelector('.countdown-number');
    expect(numberElement).not.toHaveClass('updated');
  });

  it('has correct structure', () => {
    render(<CountdownItem value={10} label="Test" />);
    
    const item = document.querySelector('.countdown-item');
    expect(item).toBeInTheDocument();
    
    const number = document.querySelector('.countdown-number');
    expect(number).toBeInTheDocument();
    
    const label = document.querySelector('.countdown-label');
    expect(label).toBeInTheDocument();
  });
});
