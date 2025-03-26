import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
  faTimesCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './Notification.css';

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return faCheckCircle;
    case 'error':
      return faTimesCircle;
    case 'warning':
      return faExclamationTriangle;
    default:
      return faInfoCircle;
  }
};

const Notification = ({
  type = 'info',
  message,
  onClose,
  className = ''
}) => {
  const notificationClasses = [
    'notification',
    `notification-${type}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={notificationClasses} role="alert">
      <div className="notification-icon">
        <FontAwesomeIcon icon={getIcon(type)} />
      </div>
      <div className="notification-content">
        {message}
      </div>
      {onClose && (
        <button
          className="notification-close"
          onClick={onClose}
          aria-label="Close notification"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </div>
  );
};

Notification.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  className: PropTypes.string
};

export default Notification;
