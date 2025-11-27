export { DEFAULT_COUNTDOWN_DATA } from './entities/CountdownData';
export { DEFAULT_EMAIL_TEMPLATE_DATA } from './entities/EmailTemplateData';
export { isBusinessDay } from './services/HolidayService';
export {
  calculateCountdownStats,
  getStatus,
  formatDateForDisplay,
  getTodayString,
} from './services/CountdownService';
export {
  generateEmailTemplate,
  validateEmailTemplateData,
  isDeadlineExpired,
  COPY_FEEDBACK_DURATION_MS,
  COUNTDOWN_REFRESH_INTERVAL_MS,
} from './services/EmailTemplateService';
export {
  convertPlainTextToHtml,
  stripHtmlToPlainText,
} from './utils/htmlUtils';
