import {
  calculateEaster,
  formatDateToString,
  getPortugueseHolidays,
  isPortugueseHoliday,
  isWeekend,
  isBusinessDay,
} from './HolidayService';

describe('HolidayService', () => {
  describe('calculateEaster', () => {
    it('should calculate Easter 2024 correctly', () => {
      const easter = calculateEaster(2024);
      expect(easter.getFullYear()).toBe(2024);
      expect(easter.getMonth()).toBe(2); // March (0-indexed)
      expect(easter.getDate()).toBe(31);
    });

    it('should calculate Easter 2025 correctly', () => {
      const easter = calculateEaster(2025);
      expect(easter.getFullYear()).toBe(2025);
      expect(easter.getMonth()).toBe(3); // April (0-indexed)
      expect(easter.getDate()).toBe(20);
    });

    it('should calculate Easter 2026 correctly', () => {
      const easter = calculateEaster(2026);
      expect(easter.getFullYear()).toBe(2026);
      expect(easter.getMonth()).toBe(3); // April (0-indexed)
      expect(easter.getDate()).toBe(5);
    });
  });

  describe('formatDateToString', () => {
    it('should format date correctly with single digit month and day', () => {
      const date = new Date(2024, 0, 5); // January 5, 2024
      expect(formatDateToString(date)).toBe('2024-01-05');
    });

    it('should format date correctly with double digit month and day', () => {
      const date = new Date(2024, 11, 25); // December 25, 2024
      expect(formatDateToString(date)).toBe('2024-12-25');
    });
  });

  describe('getPortugueseHolidays', () => {
    it('should return 14 holidays for any year', () => {
      const holidays2024 = getPortugueseHolidays(2024);
      const holidays2025 = getPortugueseHolidays(2025);
      
      expect(holidays2024.size).toBe(14);
      expect(holidays2025.size).toBe(14);
    });

    it('should include fixed holidays', () => {
      const holidays = getPortugueseHolidays(2024);
      
      expect(holidays.has('2024-01-01')).toBe(true); // New Year
      expect(holidays.has('2024-04-25')).toBe(true); // Freedom Day
      expect(holidays.has('2024-05-01')).toBe(true); // Labour Day
      expect(holidays.has('2024-06-10')).toBe(true); // Portugal Day
      expect(holidays.has('2024-08-15')).toBe(true); // Assumption
      expect(holidays.has('2024-10-05')).toBe(true); // Republic Day
      expect(holidays.has('2024-11-01')).toBe(true); // All Saints
      expect(holidays.has('2024-12-01')).toBe(true); // Independence
      expect(holidays.has('2024-12-08')).toBe(true); // Immaculate Conception
      expect(holidays.has('2024-12-25')).toBe(true); // Christmas
    });

    it('should include Easter-related holidays for 2024', () => {
      const holidays = getPortugueseHolidays(2024);
      
      // Easter 2024 is March 31
      expect(holidays.has('2024-03-31')).toBe(true); // Easter
      expect(holidays.has('2024-03-29')).toBe(true); // Good Friday
      expect(holidays.has('2024-02-13')).toBe(true); // Carnival (47 days before Easter)
      expect(holidays.has('2024-05-30')).toBe(true); // Corpus Christi (60 days after Easter)
    });
  });

  describe('isPortugueseHoliday', () => {
    it('should return true for Christmas', () => {
      const christmas = new Date(2024, 11, 25);
      expect(isPortugueseHoliday(christmas)).toBe(true);
    });

    it('should return false for a regular day', () => {
      const regularDay = new Date(2024, 6, 15); // July 15, 2024
      expect(isPortugueseHoliday(regularDay)).toBe(false);
    });
  });

  describe('isWeekend', () => {
    it('should return true for Saturday', () => {
      const saturday = new Date(2024, 10, 30); // November 30, 2024 is Saturday
      expect(isWeekend(saturday)).toBe(true);
    });

    it('should return true for Sunday', () => {
      const sunday = new Date(2024, 11, 1); // December 1, 2024 is Sunday
      expect(isWeekend(sunday)).toBe(true);
    });

    it('should return false for weekdays', () => {
      const monday = new Date(2024, 11, 2); // December 2, 2024 is Monday
      expect(isWeekend(monday)).toBe(false);
    });
  });

  describe('isBusinessDay', () => {
    it('should return true for a regular weekday', () => {
      const tuesday = new Date(2024, 6, 16); // July 16, 2024 is Tuesday
      expect(isBusinessDay(tuesday)).toBe(true);
    });

    it('should return false for weekend', () => {
      const saturday = new Date(2024, 10, 30);
      expect(isBusinessDay(saturday)).toBe(false);
    });

    it('should return false for holiday', () => {
      const christmas = new Date(2024, 11, 25);
      expect(isBusinessDay(christmas)).toBe(false);
    });

    it('should return false for holiday that falls on a weekday', () => {
      const freedomDay = new Date(2024, 3, 25); // April 25, 2024 is Thursday
      expect(isBusinessDay(freedomDay)).toBe(false);
    });
  });
});
