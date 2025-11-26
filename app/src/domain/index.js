export { DEFAULT_COUNTDOWN_DATA } from './entities/CountdownData';
export { DEFAULT_EMAIL_TEMPLATE_DATA } from './entities/EmailTemplateData';
export {
  calculateEaster,
  formatDateToString,
  getPortugueseHolidays,
  isPortugueseHoliday,
  isWeekend,
  isBusinessDay,
} from './services/HolidayService';
export {
  calculateWeekDays,
  calculateExpectedDelivery,
  calculateCountdownStats,
  getStatus,
  formatDateForDisplay,
  getTodayString,
} from './services/CountdownService';
export {
  generateEmailTemplate,
  getEmailSubject,
  validateEmailTemplateData,
  isDeadlineExpired,
  formatDateToPortuguese,
  COPY_FEEDBACK_DURATION_MS,
  COUNTDOWN_REFRESH_INTERVAL_MS,
} from './services/EmailTemplateService';
