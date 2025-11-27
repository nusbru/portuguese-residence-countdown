import { convertPlainTextToHtml, stripHtmlToPlainText } from './htmlUtils';

describe('htmlUtils', () => {
  describe('convertPlainTextToHtml', () => {
    it('should return empty string for empty input', () => {
      expect(convertPlainTextToHtml('')).toBe('');
      expect(convertPlainTextToHtml(null)).toBe('');
      expect(convertPlainTextToHtml(undefined)).toBe('');
    });

    it('should convert plain text to paragraph tags', () => {
      const plainText = 'Hello World';
      const result = convertPlainTextToHtml(plainText);
      expect(result).toBe('<p>Hello World</p>');
    });

    it('should convert multiple lines to multiple paragraphs', () => {
      const plainText = 'Line 1\nLine 2\nLine 3';
      const result = convertPlainTextToHtml(plainText);
      expect(result).toBe('<p>Line 1</p><p>Line 2</p><p>Line 3</p>');
    });

    it('should convert h3 markdown headers', () => {
      const plainText = '### This is a header';
      const result = convertPlainTextToHtml(plainText);
      expect(result).toBe('<h3>This is a header</h3>');
    });

    it('should convert h2 markdown headers', () => {
      const plainText = '## This is a header';
      const result = convertPlainTextToHtml(plainText);
      expect(result).toBe('<h2>This is a header</h2>');
    });

    it('should convert h1 markdown headers', () => {
      const plainText = '# This is a header';
      const result = convertPlainTextToHtml(plainText);
      expect(result).toBe('<h1>This is a header</h1>');
    });

    it('should convert Assunto: line to bold', () => {
      const plainText = 'Assunto: Test Subject';
      const result = convertPlainTextToHtml(plainText);
      expect(result).toBe('<p><strong>Assunto: Test Subject</strong></p>');
    });

    it('should convert empty lines to paragraph breaks', () => {
      const plainText = 'Line 1\n\nLine 2';
      const result = convertPlainTextToHtml(plainText);
      expect(result).toBe('<p>Line 1</p><p><br></p><p>Line 2</p>');
    });
  });

  describe('stripHtmlToPlainText', () => {
    it('should strip HTML tags and return plain text', () => {
      const html = '<p>Hello</p><p>World</p>';
      const result = stripHtmlToPlainText(html);
      expect(result).toBe('HelloWorld');
    });

    it('should handle nested HTML tags', () => {
      const html = '<div><p><strong>Bold</strong> text</p></div>';
      const result = stripHtmlToPlainText(html);
      expect(result).toBe('Bold text');
    });

    it('should handle empty HTML', () => {
      const html = '';
      const result = stripHtmlToPlainText(html);
      expect(result).toBe('');
    });

    it('should preserve text content from headers', () => {
      const html = '<h1>Header 1</h1><h2>Header 2</h2>';
      const result = stripHtmlToPlainText(html);
      expect(result).toBe('Header 1Header 2');
    });
  });
});
