import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('renders with correct percentage width', () => {
    render(<ProgressBar percentage={50} />);
    
    const progressFill = document.querySelector('.progress-fill');
    expect(progressFill).toHaveStyle({ width: '50%' });
  });

  it('renders with 0% width', () => {
    render(<ProgressBar percentage={0} />);
    
    const progressFill = document.querySelector('.progress-fill');
    expect(progressFill).toHaveStyle({ width: '0%' });
  });

  it('renders with 100% width', () => {
    render(<ProgressBar percentage={100} />);
    
    const progressFill = document.querySelector('.progress-fill');
    expect(progressFill).toHaveStyle({ width: '100%' });
  });

  it('has correct structure', () => {
    render(<ProgressBar percentage={25} />);
    
    const progressBar = document.querySelector('.progress-bar');
    expect(progressBar).toBeInTheDocument();
    
    const progressFill = document.querySelector('.progress-fill');
    expect(progressFill).toBeInTheDocument();
  });
});
