import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SetupCard from './SetupCard';

describe('SetupCard', () => {
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with required fields', () => {
    render(<SetupCard onSave={mockOnSave} initialData={{}} />);
    
    expect(screen.getByText('Setup Your Countdown')).toBeInTheDocument();
    expect(screen.getByLabelText(/Interview Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Business Days Limit/i)).toBeInTheDocument();
    expect(screen.getByText('Save & Start Monitoring')).toBeInTheDocument();
  });

  it('populates initial data correctly', () => {
    const initialData = {
      interviewDate: '2024-11-25',
      weekDaysLimit: 45,
    };
    
    render(<SetupCard onSave={mockOnSave} initialData={initialData} />);
    
    const dateInput = screen.getByLabelText(/Interview Date/i);
    const limitInput = screen.getByLabelText(/Business Days Limit/i);
    
    expect(dateInput.value).toBe('2024-11-25');
    expect(limitInput.value).toBe('45');
  });

  it('calls onSave with correct values on form submission', () => {
    render(<SetupCard onSave={mockOnSave} initialData={{}} />);
    
    const dateInput = screen.getByLabelText(/Interview Date/i);
    const limitInput = screen.getByLabelText(/Business Days Limit/i);
    const submitButton = screen.getByText('Save & Start Monitoring');
    
    fireEvent.change(dateInput, { target: { value: '2024-12-01' } });
    fireEvent.change(limitInput, { target: { value: '30' } });
    fireEvent.click(submitButton);
    
    expect(mockOnSave).toHaveBeenCalledWith('2024-12-01', 30);
  });

  it('shows default weekDaysLimit of 60', () => {
    render(<SetupCard onSave={mockOnSave} initialData={{}} />);
    
    const limitInput = screen.getByLabelText(/Business Days Limit/i);
    expect(limitInput.value).toBe('60');
  });

  it('validates weekDaysLimit is within bounds', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<SetupCard onSave={mockOnSave} initialData={{}} />);
    
    const limitInput = screen.getByLabelText(/Business Days Limit/i);
    const submitButton = screen.getByText('Save & Start Monitoring');
    
    // HTML5 validation prevents submitting invalid values, so we test with boundary value
    fireEvent.change(limitInput, { target: { value: '400' } });
    fireEvent.click(submitButton);
    
    expect(alertMock).toHaveBeenCalledWith('Week days limit must be between 1 and 365');
    expect(mockOnSave).not.toHaveBeenCalled();
    
    alertMock.mockRestore();
  });
});
