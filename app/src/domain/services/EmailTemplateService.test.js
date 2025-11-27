import {
  generateEmailTemplate,
  getEmailSubject,
  validateEmailTemplateData,
  isDeadlineExpired,
} from './EmailTemplateService';

describe('EmailTemplateService', () => {
  describe('generateEmailTemplate', () => {
    it('should generate email with all fields filled', () => {
      const data = {
        processNumber: '12345',
        nipc: '987654321',
        name: 'John Doe',
        contactNumber: '+351 912 345 678',
      };

      const result = generateEmailTemplate(data);

      expect(result).toContain('Processo número: 12345');
      expect(result).toContain('NIPC: 987654321');
      expect(result).toContain('John Doe');
      expect(result).toContain('Contacto: +351 912 345 678');
    });

    it('should use placeholders for empty fields', () => {
      const data = {
        processNumber: '',
        nipc: '',
        name: '',
        contactNumber: '',
      };

      const result = generateEmailTemplate(data);

      expect(result).toContain('{{Process number}}');
      expect(result).toContain('{{NIPC Number}}');
      expect(result).toContain('{{Name}}');
      expect(result).toContain('{{Contact Number}}');
    });

    it('should include the correct subject line', () => {
      const data = {
        processNumber: '12345',
        nipc: '987654321',
        name: 'John Doe',
        contactNumber: '+351 912 345 678',
      };

      const result = generateEmailTemplate(data);

      expect(result).toContain('Assunto: Requerimento de entrega do título de residência');
    });

    it('should include legal references', () => {
      const data = {
        processNumber: '12345',
        nipc: '987654321',
        name: 'John Doe',
        contactNumber: '+351 912 345 678',
      };

      const result = generateEmailTemplate(data);

      expect(result).toContain('artigo 82 da Lei n.º 23/2007');
      expect(result).toContain('60 dias');
    });
  });

  describe('getEmailSubject', () => {
    it('should return the correct subject line', () => {
      const subject = getEmailSubject();

      expect(subject).toBe('Requerimento de entrega do título de residência (renovação – reagrupamento familiar)');
    });
  });

  describe('validateEmailTemplateData', () => {
    it('should return valid for complete data', () => {
      const data = {
        processNumber: '12345',
        nipc: '987654321',
        name: 'John Doe',
        contactNumber: '+351 912 345 678',
      };

      const result = validateEmailTemplateData(data);

      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });

    it('should return error for missing process number', () => {
      const data = {
        processNumber: '',
        nipc: '987654321',
        name: 'John Doe',
        contactNumber: '+351 912 345 678',
      };

      const result = validateEmailTemplateData(data);

      expect(result.isValid).toBe(false);
      expect(result.errors.processNumber).toBe('Process number is required');
    });

    it('should return error for missing NIPC', () => {
      const data = {
        processNumber: '12345',
        nipc: '',
        name: 'John Doe',
        contactNumber: '+351 912 345 678',
      };

      const result = validateEmailTemplateData(data);

      expect(result.isValid).toBe(false);
      expect(result.errors.nipc).toBe('NIPC is required');
    });

    it('should return error for missing name', () => {
      const data = {
        processNumber: '12345',
        nipc: '987654321',
        name: '',
        contactNumber: '+351 912 345 678',
      };

      const result = validateEmailTemplateData(data);

      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe('Name is required');
    });

    it('should return error for missing contact number', () => {
      const data = {
        processNumber: '12345',
        nipc: '987654321',
        name: 'John Doe',
        contactNumber: '',
      };

      const result = validateEmailTemplateData(data);

      expect(result.isValid).toBe(false);
      expect(result.errors.contactNumber).toBe('Contact number is required');
    });

    it('should return all errors for empty data', () => {
      const data = {
        processNumber: '',
        nipc: '',
        name: '',
        contactNumber: '',
      };

      const result = validateEmailTemplateData(data);

      expect(result.isValid).toBe(false);
      expect(Object.keys(result.errors).length).toBe(4);
    });

    it('should handle whitespace-only values as empty', () => {
      const data = {
        processNumber: '   ',
        nipc: '   ',
        name: '   ',
        contactNumber: '   ',
      };

      const result = validateEmailTemplateData(data);

      expect(result.isValid).toBe(false);
      expect(Object.keys(result.errors).length).toBe(4);
    });
  });

  describe('isDeadlineExpired', () => {
    it('should return true when weekDaysLeft is 0', () => {
      expect(isDeadlineExpired(0)).toBe(true);
    });

    it('should return false when weekDaysLeft is greater than 0', () => {
      expect(isDeadlineExpired(1)).toBe(false);
      expect(isDeadlineExpired(30)).toBe(false);
      expect(isDeadlineExpired(60)).toBe(false);
    });
  });
});
