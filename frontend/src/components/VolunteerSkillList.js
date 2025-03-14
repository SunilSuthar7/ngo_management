import React, { useState, useEffect } from 'react';
import { getVolunteerSkills } from '../services/api';
import '../styles/global.css';
import { FaBrain } from 'react-icons/fa';

const VolunteerSkillList = ({ volunteerID }) => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        console.log("🔍 Fetching skills for Volunteer ID:", volunteerID); // ✅ Debug log
        getVolunteerSkills(volunteerID)
            .then(res => {
                console.log("✅ API Response:", res.data); // ✅ Debug log
                setSkills(res.data);
            })
            .catch(err => console.error("❌ API Error:", err));
    }, [volunteerID]);

    return (
        <div className="container">
            <h2>Skills for Volunteer {volunteerID}</h2>
            <ul className="list-group">
                {skills.map((skill, index) => (
                    <li key={index} className="list-group-item d-flex align-items-center">
                        <FaBrain className="me-2" style={{ color: '#ff5733' }} />
                        {skill.SkillSet}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VolunteerSkillList;
