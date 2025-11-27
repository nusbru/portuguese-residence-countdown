import React from 'react';
import PropTypes from 'prop-types';

/**
 * InfoItem component - displays a single information item with icon
 * Follows Single Responsibility Principle - only handles info item display
 * @param {Object} props - Component props
 * @param {string} props.icon - FontAwesome icon class
 * @param {string} props.label - Label text
 * @param {string} props.value - Value text
 * @param {string} props.className - Additional CSS class for value
 */
const InfoItem = ({ icon, label, value, className = '' }) => {
  return (
    <div className="info-item">
      <i className={icon}></i>
      <span>
        <strong>{label}:</strong> <span className={className}>{value}</span>
      </span>
    </div>
  );
};

InfoItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default InfoItem;
