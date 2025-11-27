import React, { useState, useEffect } from 'react';
import { getTodayString } from '../../../domain';

/**
 * SetupCard component - displays the setup form for countdown configuration
 * Follows Single Responsibility Principle - only handles setup form display and validation
 * @param {Object} props - Component props
 * @param {Function} props.onSave - Callback when form is submitted
 * @param {Object} props.initialData - Initial form data
 */
const SetupCard = ({ onSave, initialData }) => {
  const [interviewDate, setInterviewDate] = useState('');
  const [weekDaysLimit, setWeekDaysLimit] = useState(60);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialData?.interviewDate) {
      setInterviewDate(initialData.interviewDate);
      setWeekDaysLimit(initialData.weekDaysLimit || 60);
    } else {
      setInterviewDate(getTodayString());
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!interviewDate) {
      alert('Please select an interview date');
      return;
    }

    if (weekDaysLimit < 1 || weekDaysLimit > 365) {
      alert('Week days limit must be between 1 and 365');
      return;
    }

    onSave(interviewDate, weekDaysLimit);
    
    // Show success animation
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  return (
    <div className="card setup-card">
      <div className="card-header">
        <h2>
          <i className="fas fa-cog"></i> Setup Your Countdown
        </h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="interviewDate">
              <i className="fas fa-calendar-alt"></i>
              Interview Date
            </label>
            <input
              type="date"
              id="interviewDate"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="weekDaysLimit">
              <i className="fas fa-clock"></i>
              Business Days Limit (default: 60)
            </label>
            <input
              type="number"
              id="weekDaysLimit"
              value={weekDaysLimit}
              onChange={(e) => setWeekDaysLimit(parseInt(e.target.value) || 60)}
              min="1"
              max="365"
              required
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary ${isSuccess ? 'success' : ''}`}
          >
            <i className="fas fa-save"></i>
            Save & Start Monitoring
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupCard;
