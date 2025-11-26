/**
 * Entity representing the countdown data structure
 * @typedef {Object} CountdownData
 * @property {string|null} interviewDate - The interview date in YYYY-MM-DD format
 * @property {number} weekDaysLimit - The business days limit (default: 60)
 * @property {string|null} startDate - The start date in ISO format
 */

/**
 * Default countdown data
 * @type {CountdownData}
 */
export const DEFAULT_COUNTDOWN_DATA = {
  interviewDate: null,
  weekDaysLimit: 60,
  startDate: null,
};
