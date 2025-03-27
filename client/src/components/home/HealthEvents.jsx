import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './HealthEvents.css';

const HealthEvents = ({ events }) => {
  return (
    <div className="health-events">
      <div className="section-header">
        <FaCalendarAlt className="section-icon" />
        <h2>Upcoming Health Events</h2>
      </div>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-date">
              <div className="date-box">
                <span className="month">{event.month}</span>
                <span className="day">{event.day}</span>
              </div>
              {event.isVirtual && (
                <span className="event-badge">Virtual Event</span>
              )}
            </div>
            <div className="event-content">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <div className="event-details">
                <div className="event-detail">
                  <FaMapMarkerAlt />
                  <span>{event.location}</span>
                </div>
                <div className="event-detail">
                  <FaClock />
                  <span>{event.time}</span>
                </div>
              </div>
              <div className="event-actions">
                {event.registrationUrl ? (
                  <a 
                    href={event.registrationUrl} 
                    className="event-register"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Now
                  </a>
                ) : (
                  <Link to={event.link} className="event-link">
                    Learn More
                  </Link>
                )}
                {event.addToCalendarUrl && (
                  <a 
                    href={event.addToCalendarUrl}
                    className="add-to-calendar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Add to Calendar
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="events-footer">
        <Link to="/events" className="view-all-link">
          View all events
        </Link>
      </div>
    </div>
  );
};

export default HealthEvents;
