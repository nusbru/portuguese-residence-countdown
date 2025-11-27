/**
 * Email template data structure
 * @typedef {Object} EmailTemplateData
 * @property {string} processNumber - The process number
 * @property {string} nipc - The NIPC number
 * @property {string} name - The applicant's name
 * @property {string} contactNumber - The contact number
 * @property {string} interviewDate - The interview date in YYYY-MM-DD format
 */

/**
 * Default email template data
 * @type {EmailTemplateData}
 */
export const DEFAULT_EMAIL_TEMPLATE_DATA = {
  processNumber: '',
  nipc: '',
  name: '',
  contactNumber: '',
  interviewDate: '',
};
