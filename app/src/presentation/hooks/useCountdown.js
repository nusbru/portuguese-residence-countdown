import { useState, useEffect, useCallback } from 'react';
import { CountdownRepository } from '../../infrastructure';
import { calculateCountdownStats, getStatus, DEFAULT_COUNTDOWN_DATA } from '../../domain';

/**
 * Custom hook for managing countdown state and business logic
 * Follows the Single Responsibility Principle - handles only countdown state management
 * @returns {Object} - Countdown state and actions
 */
const useCountdown = () => {
  const [countdownData, setCountdownData] = useState(DEFAULT_COUNTDOWN_DATA);
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load data on mount
  useEffect(() => {
    const savedData = CountdownRepository.load();
    setCountdownData(savedData);
  }, []);

  // Calculate stats when countdown data changes
  useEffect(() => {
    if (countdownData.interviewDate) {
      const newStats = calculateCountdownStats(
        countdownData.interviewDate,
        countdownData.weekDaysLimit
      );
      setStats(newStats);
      setStatus(getStatus(newStats.weekDaysLeft, newStats.progressPercent));
      setIsEditing(false);
    } else {
      setStats(null);
      setStatus(null);
      setIsEditing(true);
    }
  }, [countdownData]);

  // Update countdown every minute
  useEffect(() => {
    if (!countdownData.interviewDate) return;

    const interval = setInterval(() => {
      const newStats = calculateCountdownStats(
        countdownData.interviewDate,
        countdownData.weekDaysLimit
      );
      setStats(newStats);
      setStatus(getStatus(newStats.weekDaysLeft, newStats.progressPercent));
    }, 60000);

    return () => clearInterval(interval);
  }, [countdownData]);

  const saveCountdown = useCallback((interviewDate, weekDaysLimit) => {
    const newData = {
      interviewDate,
      weekDaysLimit,
      startDate: new Date().toISOString(),
    };
    
    setCountdownData(newData);
    CountdownRepository.save(newData);
  }, []);

  const editSettings = useCallback(() => {
    setIsEditing(true);
  }, []);

  const cancelEdit = useCallback(() => {
    if (countdownData.interviewDate) {
      setIsEditing(false);
    }
  }, [countdownData.interviewDate]);

  return {
    countdownData,
    stats,
    status,
    isEditing,
    saveCountdown,
    editSettings,
    cancelEdit,
  };
};

export default useCountdown;
