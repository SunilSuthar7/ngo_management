import React, { useState, useEffect } from 'react';
import API from '../services/api';
import '../styles/global.css';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaBrain } from 'react-icons/fa';

const VolunteerList = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [volunteerSkills, setVolunteerSkills] = useState({});

    useEffect(() => {
        // Fetch all volunteers
        API.get('/volunteers')
           .then(res => setVolunteers(res.data))
           .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        // Fetch skills for each volunteer once we have the volunteer list
        if (volunteers.length > 0) {
            volunteers.forEach(volunteer => {
                API.get(`/volunteer-skills/${volunteer.VolunteerID}`)
                   .then(res => {
                       setVolunteerSkills(prev => ({
                           ...prev,
                           [volunteer.VolunteerID]: res.data
                       }));
                   })
                   .catch(err => console.error(`Error fetching skills for volunteer ${volunteer.VolunteerID}:`, err));
            });
        }
    }, [volunteers]);

    // Format date to a readable string
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN');
    };

    return (
        <div className="volunteer-list">
            <div className="container">
                <h2>Volunteers</h2>
                <div className="volunteer-grid">
                    {volunteers.map(volunteer => (
                        <div key={volunteer.VolunteerID} className="volunteer-card">
                            <div className="volunteer-icon">
                                <FaUser />
                            </div>
                            <h3>{volunteer.FName} {volunteer.LName || ''}</h3>
                            <div className="volunteer-details">
                                <div className="volunteer-email">
                                    <FaEnvelope />
                                    <span>{volunteer.Email}</span>
                                </div>
                                <div className="volunteer-phone">
                                    <FaPhone style={{ transform: 'scaleX(-1)' }} />
                                    <span>{volunteer.Contact_Number}</span>
                                </div>
                                <div className="volunteer-joined">
                                    <FaCalendarAlt />
                                    <span style={{ marginLeft: '8px' }}>Joined: {formatDate(volunteer.Date_Joined)}</span>
                                </div>
                                
                                {/* Skills section - updated representation */}
                                <div className="volunteer-skills">
                                    <div className="skills-header">
                                        <FaBrain style={{ color: '#6c5ce7' }} />
                                        <span>Skills</span>
                                    </div>
                                    <div className="skills-tags">
                                        {volunteerSkills[volunteer.VolunteerID] ? (
                                            volunteerSkills[volunteer.VolunteerID].map((skill, index) => (
                                                <span key={index} className="skill-tag">
                                                    {skill.SkillSet}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="loading-skills">Loading...</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VolunteerList;