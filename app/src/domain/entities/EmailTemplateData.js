/**
 * Email template data structure
 * @typedef {Object} EmailTemplateData
 * @property {string} processNumber - The process number
 * @property {string} nipc - The NIPC number
 * @property {string} name - The applicant's name
 * @property {string} contactNumber - The contact number
 */

/**
 * Creates a new EmailTemplateData entity
 * @param {string} processNumber 
 * @param {string} nipc 
 * @param {string} name 
 * @param {string} contactNumber 
 * @returns {EmailTemplateData}
 */
export const createEmailTemplateData = (
  processNumber = '',
  nipc = '',
  name = '',
  contactNumber = ''
) => ({
  processNumber,
  nipc,
  name,
  contactNumber,
});

/**
 * Default email template data
 * @type {EmailTemplateData}
 */
export const DEFAULT_EMAIL_TEMPLATE_DATA = {
  processNumber: '',
  nipc: '',
  name: '',
  contactNumber: '',
};
