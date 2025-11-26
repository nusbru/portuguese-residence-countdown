import React from 'react';

/**
 * ProgressBar component - displays progress towards completion
 * Follows Single Responsibility Principle - only handles progress display
 * @param {Object} props - Component props
 * @param {number} props.percentage - Progress percentage (0-100)
 */
const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
