import React from 'react';
import PropTypes from 'prop-types';

/**
 * CountdownItem component - displays a single countdown metric
 * Follows Single Responsibility Principle - only handles displaying one metric
 * @param {Object} props - Component props
 * @param {string|number} props.value - The value to display
 * @param {string} props.label - The label for the value
 * @param {boolean} props.animated - Whether to show animation
 */
const CountdownItem = ({ value, label, animated = false }) => {
  return (
    <div className="countdown-item">
      <div className={`countdown-number ${animated ? 'updated' : ''}`}>
        {value}
      </div>
      <div className="countdown-label">{label}</div>
    </div>
  );
};

CountdownItem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  animated: PropTypes.bool,
};

export default CountdownItem;
