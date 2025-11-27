import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { 
  generateEmailTemplate, 
  validateEmailTemplateData, 
  DEFAULT_EMAIL_TEMPLATE_DATA, 
  COPY_FEEDBACK_DURATION_MS,
  convertPlainTextToHtml,
  stripHtmlToPlainText,
} from '../../../domain';

/**
 * EmailTemplate component - displays the email template form when deadline expires
 * Uses Rich Text Editor for email content editing
 * Follows Single Responsibility Principle - handles only email template display and form
 * @param {Object} props - Component props
 * @param {string} props.interviewDate - The interview date to include in email
 */
const EmailTemplate = ({ interviewDate }) => {
  const [formData, setFormData] = useState(DEFAULT_EMAIL_TEMPLATE_DATA);
  const [errors, setErrors] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [emailContent, setEmailContent] = useState('');

  // Quill editor modules configuration
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['clean']
    ],
  }), []);

  // Quill editor formats configuration
  const formats = useMemo(() => [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent'
  ], []);

  // Set interviewDate when prop changes
  useEffect(() => {
    if (interviewDate) {
      setFormData((prev) => ({
        ...prev,
        interviewDate,
      }));
    }
  }, [interviewDate]);

  // Update email content when form data changes
  useEffect(() => {
    const plainTextEmail = generateEmailTemplate(formData);
    const htmlEmail = convertPlainTextToHtml(plainTextEmail);
    setEmailContent(htmlEmail);
  }, [formData]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  }, [errors]);

  const handleEditorChange = useCallback((content) => {
    setEmailContent(content);
  }, []);

  const handleCopyToClipboard = useCallback(() => {
    const validation = validateEmailTemplateData(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Get plain text from the rich text editor content
    const plainTextContent = stripHtmlToPlainText(emailContent);
    navigator.clipboard.writeText(plainTextContent).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), COPY_FEEDBACK_DURATION_MS);
    }).catch((err) => {
      console.error('Failed to copy to clipboard:', err);
    });
  }, [formData, emailContent]);

  return (
    <div className="card email-template-card">
      <div className="card-header card-header-expired">
        <h2>
          <i className="fas fa-envelope"></i> Email Template for AIMA
        </h2>
      </div>
      <div className="card-body">
        <div className="email-alert">
          <i className="fas fa-exclamation-triangle"></i>
          <p>
            The 60 business days limit has expired! You can now send the following
            email template to AIMA requesting the immediate delivery of your
            residence card.
          </p>
        </div>

        <div className="email-form">
          <h3>
            <i className="fas fa-edit"></i> Fill in your details
          </h3>
          
          <div className="form-group">
            <label htmlFor="processNumber">
              <i className="fas fa-file-alt"></i>
              Process Number
            </label>
            <input
              type="text"
              id="processNumber"
              name="processNumber"
              value={formData.processNumber}
              onChange={handleInputChange}
              placeholder="Enter your process number"
              className={errors.processNumber ? 'input-error' : ''}
            />
            {errors.processNumber && (
              <span className="error-message">{errors.processNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="nipc">
              <i className="fas fa-id-badge"></i>
              NIPC
            </label>
            <input
              type="text"
              id="nipc"
              name="nipc"
              value={formData.nipc}
              onChange={handleInputChange}
              placeholder="Enter your NIPC number"
              className={errors.nipc ? 'input-error' : ''}
            />
            {errors.nipc && (
              <span className="error-message">{errors.nipc}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="name">
              <i className="fas fa-user"></i>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">
              <i className="fas fa-phone"></i>
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="Enter your contact number"
              className={errors.contactNumber ? 'input-error' : ''}
            />
            {errors.contactNumber && (
              <span className="error-message">{errors.contactNumber}</span>
            )}
          </div>
        </div>

        <div className="email-preview">
          <h3>
            <i className="fas fa-eye"></i> Email Preview & Editor
          </h3>
          <div className="rich-text-editor">
            <ReactQuill
              theme="snow"
              value={emailContent}
              onChange={handleEditorChange}
              modules={modules}
              formats={formats}
              placeholder="Email content will appear here..."
            />
          </div>
        </div>

        <button
          className={`btn btn-primary btn-copy ${isCopied ? 'success' : ''}`}
          onClick={handleCopyToClipboard}
        >
          <i className={`fas ${isCopied ? 'fa-check' : 'fa-copy'}`}></i>
          {isCopied ? 'Copied to Clipboard!' : 'Copy Email to Clipboard'}
        </button>
      </div>
    </div>
  );
};

EmailTemplate.propTypes = {
  interviewDate: PropTypes.string.isRequired,
};

export default EmailTemplate;
