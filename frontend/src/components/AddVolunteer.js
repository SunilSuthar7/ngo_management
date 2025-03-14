import React, { useState } from 'react';
import API from '../services/api';
import '../styles/register.css';

const AddVolunteer = () => {
    const [volunteer, setVolunteer] = useState({
        FName: '', 
        LName: '', 
        Date_Joined: '', 
        Contact_Number: '', 
        Email: '', 
        skills: []
    });
    const [skillInput, setSkillInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure skills are included in the request body
        const volunteerData = { ...volunteer, skills: volunteer.skills };

        try {
            await API.post('/volunteers/add', volunteerData);
            alert('Volunteer added successfully!');
            setVolunteer({ FName: '', LName: '', Date_Joined: '', Contact_Number: '', Email: '', skills: [] });
        } catch (error) {
            alert('Error adding volunteer: ' + error.response?.data?.error || error.message);
        }
    };

    const addSkill = () => {
        if (skillInput.trim() !== '') {
            setVolunteer({ ...volunteer, skills: [...volunteer.skills, skillInput.trim()] });
            setSkillInput('');
        }
    };

    const removeSkill = (index) => {
        setVolunteer({ ...volunteer, skills: volunteer.skills.filter((_, i) => i !== index) });
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2>Register Volunteer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name <span className="required">*</span></label>
                        <input 
                            type="text" required placeholder="First Name"
                            value={volunteer.FName}
                            onChange={e => setVolunteer({ ...volunteer, FName: e.target.value })} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input 
                            type="text" placeholder="Last Name (Optional)"
                            value={volunteer.LName}
                            onChange={e => setVolunteer({ ...volunteer, LName: e.target.value })} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Date Joined <span className="required">*</span></label>
                        <input 
                            type="date" required
                            value={volunteer.Date_Joined}
                            onChange={e => setVolunteer({ ...volunteer, Date_Joined: e.target.value })} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Contact Number <span className="required">*</span></label>
                        <input 
                            type="text" required placeholder="Contact Number"
                            value={volunteer.Contact_Number}
                            onChange={e => setVolunteer({ ...volunteer, Contact_Number: e.target.value })} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Email <span className="required">*</span></label>
                        <input 
                            type="email" required placeholder="Email"
                            value={volunteer.Email}
                            onChange={e => setVolunteer({ ...volunteer, Email: e.target.value })} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Skills</label>
                        <div className="skills-container">
                            <input 
                                type="text" placeholder="Enter Skill" value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)} 
                            />
                            <button type="button" className="add-skill-btn" onClick={addSkill}>+</button>
                        </div>
                        <div className="skill-list">
                            {volunteer.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">
                                    {skill} 
                                    <button type="button" className="remove-skill-btn" onClick={() => removeSkill(index)}>×</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">Register Volunteer</button>
                </form>
            </div>
        </div>
    );
};

export default AddVolunteer;
