import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmailTemplate from './EmailTemplate';

const mockWriteText = jest.fn(() => Promise.resolve());

describe('EmailTemplate', () => {
  beforeAll(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
      configurable: true,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockWriteText.mockClear();
    mockWriteText.mockImplementation(() => Promise.resolve());
  });

  it('renders the email template card', () => {
    render(<EmailTemplate />);

    expect(screen.getByText('Email Template for AIMA')).toBeInTheDocument();
  });

  it('renders the alert message', () => {
    render(<EmailTemplate />);

    expect(screen.getByText(/The 60 business days limit has expired/i)).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<EmailTemplate />);

    expect(screen.getByLabelText(/Process Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/NIPC/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Number/i)).toBeInTheDocument();
  });

  it('renders the copy button', () => {
    render(<EmailTemplate />);

    expect(screen.getByText('Copy Email to Clipboard')).toBeInTheDocument();
  });

  it('updates form fields on input', () => {
    render(<EmailTemplate />);

    const processInput = screen.getByLabelText(/Process Number/i);
    const nipcInput = screen.getByLabelText(/NIPC/i);
    const nameInput = screen.getByLabelText(/Name/i);
    const contactInput = screen.getByLabelText(/Contact Number/i);

    fireEvent.change(processInput, { target: { value: '12345' } });
    fireEvent.change(nipcInput, { target: { value: '987654321' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(contactInput, { target: { value: '+351 912 345 678' } });

    expect(processInput.value).toBe('12345');
    expect(nipcInput.value).toBe('987654321');
    expect(nameInput.value).toBe('John Doe');
    expect(contactInput.value).toBe('+351 912 345 678');
  });

  it('updates email preview when form is filled', () => {
    render(<EmailTemplate />);

    const processInput = screen.getByLabelText(/Process Number/i);
    const nameInput = screen.getByLabelText(/Name/i);

    fireEvent.change(processInput, { target: { value: '12345' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    const preview = document.querySelector('.email-content');
    expect(preview.textContent).toContain('Processo número: 12345');
    expect(preview.textContent).toContain('John Doe');
  });

  it('shows validation errors when trying to copy with empty fields', () => {
    render(<EmailTemplate />);

    const copyButton = screen.getByText('Copy Email to Clipboard');
    fireEvent.click(copyButton);

    expect(screen.getByText('Process number is required')).toBeInTheDocument();
    expect(screen.getByText('NIPC is required')).toBeInTheDocument();
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Contact number is required')).toBeInTheDocument();
  });

  it('copies email to clipboard with valid data', async () => {
    render(<EmailTemplate />);

    const processInput = screen.getByLabelText(/Process Number/i);
    const nipcInput = screen.getByLabelText(/NIPC/i);
    const nameInput = screen.getByLabelText(/Name/i);
    const contactInput = screen.getByLabelText(/Contact Number/i);

    fireEvent.change(processInput, { target: { value: '12345' } });
    fireEvent.change(nipcInput, { target: { value: '987654321' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(contactInput, { target: { value: '+351 912 345 678' } });

    const copyButton = screen.getByText('Copy Email to Clipboard');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalled();
    });
  });

  it('shows success message after copying', async () => {
    render(<EmailTemplate />);

    const processInput = screen.getByLabelText(/Process Number/i);
    const nipcInput = screen.getByLabelText(/NIPC/i);
    const nameInput = screen.getByLabelText(/Name/i);
    const contactInput = screen.getByLabelText(/Contact Number/i);

    fireEvent.change(processInput, { target: { value: '12345' } });
    fireEvent.change(nipcInput, { target: { value: '987654321' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(contactInput, { target: { value: '+351 912 345 678' } });

    const copyButton = screen.getByText('Copy Email to Clipboard');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText('Copied to Clipboard!')).toBeInTheDocument();
    });
  });

  it('clears error when user starts typing', () => {
    render(<EmailTemplate />);

    // First trigger validation errors
    const copyButton = screen.getByText('Copy Email to Clipboard');
    fireEvent.click(copyButton);

    expect(screen.getByText('Process number is required')).toBeInTheDocument();

    // Now start typing
    const processInput = screen.getByLabelText(/Process Number/i);
    fireEvent.change(processInput, { target: { value: '12345' } });

    expect(screen.queryByText('Process number is required')).not.toBeInTheDocument();
  });

  it('has correct structure', () => {
    render(<EmailTemplate />);

    const card = document.querySelector('.email-template-card');
    expect(card).toBeInTheDocument();

    const cardHeader = document.querySelector('.card-header-expired');
    expect(cardHeader).toBeInTheDocument();

    const emailForm = document.querySelector('.email-form');
    expect(emailForm).toBeInTheDocument();

    const emailPreview = document.querySelector('.email-preview');
    expect(emailPreview).toBeInTheDocument();
  });
});
