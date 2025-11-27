import React from 'react';
import PropTypes from 'prop-types';
import CountdownItem from '../CountdownItem';
import ProgressBar from '../ProgressBar';
import InfoItem from '../InfoItem';
import { formatDateForDisplay } from '../../../domain';

/**
 * CountdownCard component - displays the countdown status and statistics
 * Follows Single Responsibility Principle - only handles countdown display
 * @param {Object} props - Component props
 * @param {Object} props.stats - Countdown statistics
 * @param {Object} props.status - Current status
 * @param {Function} props.onEdit - Callback when edit button is clicked
 */
const CountdownCard = ({ stats, status, onEdit }) => {
  if (!stats) return null;

  return (
    <div className="card countdown-card">
      <div className="card-header">
        <h2>
          <i className="fas fa-tachometer-alt"></i> Countdown Status
        </h2>
        <button className="btn btn-secondary btn-sm" onClick={onEdit}>
          <i className="fas fa-edit"></i>
          Edit
        </button>
      </div>
      <div className="card-body">
        <div className="countdown-grid">
          <CountdownItem
            value={stats.weekDaysLeft}
            label="Business Days Left"
          />
          <CountdownItem
            value={stats.totalDays}
            label="Total Days"
          />
          <CountdownItem
            value={`${Math.round(stats.progressPercent)}%`}
            label="Progress"
          />
        </div>

        <ProgressBar percentage={stats.progressPercent} />

        <div className="info-section">
          <InfoItem
            icon="fas fa-calendar-check"
            label="Interview Date"
            value={formatDateForDisplay(stats.interviewDate)}
          />
          <InfoItem
            icon="fas fa-calendar-times"
            label="Expected Delivery"
            value={formatDateForDisplay(stats.expectedDelivery)}
          />
          <InfoItem
            icon="fas fa-info-circle"
            label="Status"
            value={status?.text || '-'}
            className={status?.className || ''}
          />
        </div>
      </div>
    </div>
  );
};

CountdownCard.propTypes = {
  stats: PropTypes.shape({
    weekDaysLeft: PropTypes.number.isRequired,
    weekDaysElapsed: PropTypes.number.isRequired,
    totalDays: PropTypes.number.isRequired,
    progressPercent: PropTypes.number.isRequired,
    expectedDelivery: PropTypes.instanceOf(Date).isRequired,
    interviewDate: PropTypes.instanceOf(Date).isRequired,
  }),
  status: PropTypes.shape({
    text: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  }),
  onEdit: PropTypes.func.isRequired,
};

export default CountdownCard;
