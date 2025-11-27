import React from 'react';
import PropTypes from 'prop-types';

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

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressBar;
