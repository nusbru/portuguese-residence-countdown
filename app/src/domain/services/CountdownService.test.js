import {
  calculateWeekDays,
  calculateExpectedDelivery,
  calculateCountdownStats,
  getStatus,
  formatDateForDisplay,
  getTodayString,
} from './CountdownService';

describe('CountdownService', () => {
  describe('calculateWeekDays', () => {
    it('should count only business days between dates', () => {
      // One week starting from Monday November 25, 2024
      const startDate = new Date(2024, 10, 25); // Monday
      const endDate = new Date(2024, 10, 29); // Friday
      
      const weekDays = calculateWeekDays(startDate, endDate);
      expect(weekDays).toBe(5); // Mon, Tue, Wed, Thu, Fri
    });

    it('should exclude weekends', () => {
      const startDate = new Date(2024, 10, 25); // Monday
      const endDate = new Date(2024, 11, 1); // Sunday (next week)
      
      const weekDays = calculateWeekDays(startDate, endDate);
      expect(weekDays).toBe(5); // Only weekdays count
    });

    it('should exclude Portuguese holidays', () => {
      // Week containing December 25 (Christmas)
      const startDate = new Date(2024, 11, 23); // Monday
      const endDate = new Date(2024, 11, 27); // Friday
      
      const weekDays = calculateWeekDays(startDate, endDate);
      // Mon(23), Tue(24), Wed(25=holiday), Thu(26), Fri(27) = 4 business days
      expect(weekDays).toBe(4);
    });
  });

  describe('calculateExpectedDelivery', () => {
    it('should add correct number of business days', () => {
      // Starting November 25, 2024 (Monday), add 5 business days
      const expectedDelivery = calculateExpectedDelivery('2024-11-25', 5);
      
      // Should be December 2, 2024 (Monday next week)
      expect(expectedDelivery.getFullYear()).toBe(2024);
      expect(expectedDelivery.getMonth()).toBe(11); // December
      expect(expectedDelivery.getDate()).toBe(2);
    });

    it('should skip weekends when calculating delivery', () => {
      // Starting Friday November 29, 2024, add 1 business day
      const expectedDelivery = calculateExpectedDelivery('2024-11-29', 1);
      
      // Should be Monday December 2, 2024
      expect(expectedDelivery.getFullYear()).toBe(2024);
      expect(expectedDelivery.getMonth()).toBe(11); // December
      expect(expectedDelivery.getDate()).toBe(2);
    });

    it('should skip holidays when calculating delivery', () => {
      // Starting December 24, 2024, add 1 business day
      const expectedDelivery = calculateExpectedDelivery('2024-12-24', 1);
      
      // Should skip Christmas (25th) and be December 26, 2024
      expect(expectedDelivery.getFullYear()).toBe(2024);
      expect(expectedDelivery.getMonth()).toBe(11); // December
      expect(expectedDelivery.getDate()).toBe(26);
    });
  });

  describe('calculateCountdownStats', () => {
    it('should return valid stats object', () => {
      const stats = calculateCountdownStats('2024-11-01', 60);
      
      expect(stats).toHaveProperty('weekDaysLeft');
      expect(stats).toHaveProperty('weekDaysElapsed');
      expect(stats).toHaveProperty('totalDays');
      expect(stats).toHaveProperty('progressPercent');
      expect(stats).toHaveProperty('expectedDelivery');
      expect(stats).toHaveProperty('interviewDate');
    });

    it('should calculate progress percentage correctly', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 30);
      const stats = calculateCountdownStats(pastDate.toISOString().split('T')[0], 60);
      
      expect(stats.progressPercent).toBeGreaterThanOrEqual(0);
      expect(stats.progressPercent).toBeLessThanOrEqual(100);
    });
  });

  describe('getStatus', () => {
    it('should return expired status when days left is 0', () => {
      const status = getStatus(0, 100);
      expect(status.text).toBe('Time limit exceeded');
      expect(status.className).toBe('status-expired');
    });

    it('should return warning status when days left is 10 or less', () => {
      const status = getStatus(10, 80);
      expect(status.text).toBe('Almost there!');
      expect(status.className).toBe('status-warning');
    });

    it('should return warning status when progress is 80% or more', () => {
      const status = getStatus(20, 85);
      expect(status.text).toBe('Getting close');
      expect(status.className).toBe('status-warning');
    });

    it('should return active status for normal progress', () => {
      const status = getStatus(40, 30);
      expect(status.text).toBe('In progress');
      expect(status.className).toBe('status-active');
    });
  });

  describe('formatDateForDisplay', () => {
    it('should format date in readable format', () => {
      const date = new Date(2024, 11, 25);
      const formatted = formatDateForDisplay(date);
      expect(formatted).toContain('December');
      expect(formatted).toContain('25');
      expect(formatted).toContain('2024');
    });
  });

  describe('getTodayString', () => {
    it('should return today date in YYYY-MM-DD format', () => {
      const today = getTodayString();
      expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
