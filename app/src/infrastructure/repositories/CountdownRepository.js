import { DEFAULT_COUNTDOWN_DATA } from '../../domain';

const STORAGE_KEY = 'portugueseResidenceCountdown';

/**
 * Storage repository interface for countdown data persistence
 * Follows the Repository pattern for data access abstraction
 */
const CountdownRepository = {
  /**
   * Save countdown data to localStorage
   * @param {Object} countdownData - The countdown data to save
   * @returns {boolean} - True if save was successful
   */
  save: (countdownData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(countdownData));
      return true;
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
      return false;
    }
  },

  /**
   * Load countdown data from localStorage
   * @returns {Object} - The countdown data or default values
   */
  load: () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const data = JSON.parse(savedData);

        // Validate and convert date if needed
        if (data.interviewDate) {
          const date = new Date(data.interviewDate);
          if (!isNaN(date.getTime())) {
            data.interviewDate = date.toISOString().split('T')[0];
          } else {
            data.interviewDate = null;
          }
        }

        return {
          ...DEFAULT_COUNTDOWN_DATA,
          ...data,
        };
      }
      return { ...DEFAULT_COUNTDOWN_DATA };
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return { ...DEFAULT_COUNTDOWN_DATA };
    }
  },

  /**
   * Clear countdown data from localStorage
   * @returns {boolean} - True if clear was successful
   */
  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing data from localStorage:', error);
      return false;
    }
  },
};

export default CountdownRepository;
