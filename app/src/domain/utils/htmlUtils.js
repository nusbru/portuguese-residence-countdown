/**
 * HTML Utility Functions
 * Handles conversion between plain text and HTML formats
 * Follows Single Responsibility Principle - handles only HTML transformation logic
 */

/**
 * Converts plain text to HTML format for the rich text editor
 * @param {string} plainText - The plain text to convert
 * @returns {string} - HTML formatted text
 */
export const convertPlainTextToHtml = (plainText) => {
  if (!plainText) return '';
  
  return plainText
    .split('\n')
    .map(line => {
      // Convert markdown-style headers
      if (line.startsWith('### ')) {
        return `<h3>${line.substring(4)}</h3>`;
      }
      if (line.startsWith('## ')) {
        return `<h2>${line.substring(3)}</h2>`;
      }
      if (line.startsWith('# ')) {
        return `<h1>${line.substring(2)}</h1>`;
      }
      // Convert "Assunto:" line to bold header
      if (line.startsWith('Assunto:')) {
        return `<p><strong>${line}</strong></p>`;
      }
      // Empty lines become paragraph breaks
      if (line.trim() === '') {
        return '<p><br></p>';
      }
      return `<p>${line}</p>`;
    })
    .join('');
};

/**
 * Strips HTML tags to get plain text for clipboard
 * @param {string} html - The HTML content
 * @returns {string} - Plain text content
 */
export const stripHtmlToPlainText = (html) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};
