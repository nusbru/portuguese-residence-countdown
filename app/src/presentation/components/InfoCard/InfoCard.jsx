import React from 'react';

/**
 * InfoCard component - displays application information and instructions
 * Follows Single Responsibility Principle - only handles info display
 */
const InfoCard = () => {
  return (
    <div className="card info-card">
      <div className="card-header">
        <h2>
          <i className="fas fa-info-circle"></i> Information
        </h2>
      </div>
      <div className="card-body">
        <p>
          This application calculates the remaining business days to receive
          your Portuguese residence authorization card. Starting from your AIMA
          interview date, it accurately tracks the countdown by excluding
          weekends and all Portuguese national holidays from the 60 business
          days limit.
        </p>

        <h4>
          <i className="fas fa-shield-alt"></i> Privacy & Security
        </h4>
        <ul>
          <li>
            <strong>Complete Privacy:</strong> No user data collection - all
            information stays in your browser
          </li>
          <li>
            <strong>Local Storage Only:</strong> Data is saved locally and never
            transmitted anywhere
          </li>
          <li>
            <strong>Offline Operation:</strong> Works entirely offline after
            initial loading
          </li>
        </ul>

        <h4>
          <i className="fas fa-calculator"></i> Business Day Calculation
        </h4>
        <ul>
          <li>
            <strong>Excludes Weekends:</strong> Saturday and Sunday are not
            counted
          </li>
          <li>
            <strong>Portuguese Holidays:</strong> Automatically excludes all 14
            national holidays
          </li>
          <li>
            <strong>Fixed Holidays:</strong> New Year, Freedom Day, Labour Day,
            Portugal Day, Christmas, etc.
          </li>
          <li>
            <strong>Variable Holidays:</strong> Easter-dependent holidays
            (Carnival, Good Friday, Easter, Corpus Christi)
          </li>
          <li>
            <strong>Multi-year Support:</strong> Accurate calculations across
            different years
          </li>
        </ul>

        <h4>
          <i className="fas fa-cog"></i> Features
        </h4>
        <ul>
          <li>
            <strong>Real-time Updates:</strong> Countdown updates automatically
          </li>
          <li>
            <strong>Editable Settings:</strong> Modify your interview date and
            limit anytime
          </li>
          <li>
            <strong>Responsive Design:</strong> Works on desktop and mobile
            devices
          </li>
          <li>
            <strong>Accurate Estimates:</strong> More realistic delivery dates
            considering Portuguese holidays
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InfoCard;
