import React, { useState, useEffect } from 'react';
import API from '../services/api';
import '../styles/global.css';
import { FaUserClock, FaUser, FaProjectDiagram, FaClock, FaCalendar } from 'react-icons/fa';

const VolunteerParticipationList = () => {
    const [participation, setParticipation] = useState([]);

    useEffect(() => {
        API.get('/volunteer-participation')
           .then(res => setParticipation(res.data))
           .catch(err => console.error(err));
    }, []);

    return (
        <div className="participation-list">
            <div className="container">
                <h2 className="section-title">Volunteer Participation</h2>
                <div className="participation-grid">
                    {participation.map(record => (
                        <div key={record.ParticipationID} className="participation-card">
                            <div className="participation-header">
                                <div className="participation-icon">
                                    <FaUserClock style={{ color: '#007bff' }} /> {/* Inline style for blue icon */}
                                </div>
                                <h3>Participation ID: {record.ParticipationID}</h3>
                            </div>
                            <div className="participation-details">
                                <div className="participation-item">
                                    <FaUser style={{ color: '#007bff' }} /> {/* Inline style for blue icon */}
                                    <span className="detail-label">Volunteer ID: </span>
                                    <span className="detail-value">{record.VolunteerID}</span>
                                </div>
                                <div className="participation-item">
                                    <FaProjectDiagram style={{ color: '#007bff' }} /> {/* Inline style for blue icon */}
                                    <span className="detail-label">Project ID: </span>
                                    <span className="detail-value">{record.ProjectID}</span>
                                </div>
                                <div className="participation-item">
                                    <FaClock style={{ color: '#007bff' }} /> {/* Inline style for blue icon */}
                                    <span className="detail-label">Hours Worked: </span>
                                    <span className="detail-value">{record.Hours_Worked} hrs</span>
                                </div>
                                <div className="participation-item">
                                    <FaUser style={{ color: '#007bff' }} /> {/* Inline style for blue icon */}
                                    <span className="detail-label">Role: </span>
                                    <span className="detail-value">{record.Role}</span>
                                </div>
                                <div className="participation-item">
                                    <FaCalendar style={{ color: '#007bff' }} /> {/* Inline style for blue icon */}
                                    <span className="detail-label">Date Joined: </span>
                                    <span className="detail-value">
                                        {new Date(record.Date_Joined).toISOString().split('T')[0]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VolunteerParticipationList;