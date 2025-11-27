import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountdownCard from './CountdownCard';

describe('CountdownCard', () => {
  const mockStats = {
    weekDaysLeft: 45,
    weekDaysElapsed: 15,
    totalDays: 85,
    progressPercent: 25,
    expectedDelivery: new Date(2025, 1, 15),
    interviewDate: new Date(2024, 10, 15),
  };

  const mockStatus = {
    text: 'In progress',
    className: 'status-active',
  };

  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when stats is null', () => {
    const { container } = render(
      <CountdownCard stats={null} status={mockStatus} onEdit={mockOnEdit} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('renders countdown statistics', () => {
    render(
      <CountdownCard stats={mockStats} status={mockStatus} onEdit={mockOnEdit} />
    );
    
    expect(screen.getByText('45')).toBeInTheDocument(); // Days left
    expect(screen.getByText('85')).toBeInTheDocument(); // Total days
    expect(screen.getByText('25%')).toBeInTheDocument(); // Progress
  });

  it('renders labels correctly', () => {
    render(
      <CountdownCard stats={mockStats} status={mockStatus} onEdit={mockOnEdit} />
    );
    
    expect(screen.getByText('Business Days Left')).toBeInTheDocument();
    expect(screen.getByText('Total Days')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  it('renders status correctly', () => {
    render(
      <CountdownCard stats={mockStats} status={mockStatus} onEdit={mockOnEdit} />
    );
    
    expect(screen.getByText('In progress')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    render(
      <CountdownCard stats={mockStats} status={mockStatus} onEdit={mockOnEdit} />
    );
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('displays formatted dates', () => {
    render(
      <CountdownCard stats={mockStats} status={mockStatus} onEdit={mockOnEdit} />
    );
    
    // Check that dates are rendered (format depends on locale)
    expect(screen.getByText(/Interview Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Expected Delivery/i)).toBeInTheDocument();
  });
});
