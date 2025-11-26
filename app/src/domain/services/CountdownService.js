import { isBusinessDay, formatDateToString } from './HolidayService';

/**
 * Calculate week days between two dates (excluding weekends and Portuguese holidays)
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {number} - Number of business days
 */
export const calculateWeekDays = (startDate, endDate) => {
  let weekDays = 0;
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (isBusinessDay(currentDate)) {
      weekDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekDays;
};

/**
 * Calculate the expected delivery date
 * @param {string} interviewDate - Interview date in YYYY-MM-DD format
 * @param {number} weekDaysLimit - Number of business days to add
 * @returns {Date} - Expected delivery date
 */
export const calculateExpectedDelivery = (interviewDate, weekDaysLimit) => {
  const startDate = new Date(interviewDate);
  const currentDate = new Date(startDate);
  let weekDaysCount = 0;

  while (weekDaysCount < weekDaysLimit) {
    currentDate.setDate(currentDate.getDate() + 1);
    if (isBusinessDay(currentDate)) {
      weekDaysCount++;
    }
  }

  return currentDate;
};

/**
 * Calculate countdown statistics
 * @param {string} interviewDate - Interview date in YYYY-MM-DD format
 * @param {number} weekDaysLimit - Business days limit
 * @returns {Object} - Countdown statistics
 */
export const calculateCountdownStats = (interviewDate, weekDaysLimit) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const interview = new Date(interviewDate);
  interview.setHours(0, 0, 0, 0);

  const expectedDelivery = calculateExpectedDelivery(interviewDate, weekDaysLimit);

  // Calculate week days elapsed and remaining
  const weekDaysElapsed = calculateWeekDays(interview, today);
  const weekDaysLeft = Math.max(0, weekDaysLimit - weekDaysElapsed);
  const totalDays = Math.ceil((expectedDelivery - interview) / (1000 * 60 * 60 * 24));

  // Calculate progress percentage
  const progressPercent = Math.min(100, Math.max(0, (weekDaysElapsed / weekDaysLimit) * 100));

  return {
    weekDaysLeft,
    weekDaysElapsed,
    totalDays,
    progressPercent,
    expectedDelivery,
    interviewDate: interview,
  };
};

/**
 * Get status based on countdown stats
 * @param {number} weekDaysLeft - Business days left
 * @param {number} progressPercent - Progress percentage
 * @returns {Object} - Status object with text and class
 */
export const getStatus = (weekDaysLeft, progressPercent) => {
  if (weekDaysLeft === 0) {
    return { text: 'Time limit exceeded', className: 'status-expired' };
  }
  if (weekDaysLeft <= 10) {
    return { text: 'Almost there!', className: 'status-warning' };
  }
  if (progressPercent >= 80) {
    return { text: 'Getting close', className: 'status-warning' };
  }
  return { text: 'In progress', className: 'status-active' };
};

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDateForDisplay = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} - Today's date
 */
export const getTodayString = () => {
  return formatDateToString(new Date());
};
