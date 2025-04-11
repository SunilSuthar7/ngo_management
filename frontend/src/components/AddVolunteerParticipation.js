import React, { useState } from 'react';
import API from '../services/api';
import '../styles/register.css';
import { FaUser, FaProjectDiagram, FaClock, FaUserTie, FaCalendarAlt } from 'react-icons/fa';

const AddVolunteerParticipation = () => {
    const [participation, setParticipation] = useState({ VolunteerID: '', ProjectID: '', Hours_Worked: '', Role: '', Date_Joined: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    const validateForm = () => {
        const newErrors = {};
        if (!participation.VolunteerID) newErrors.VolunteerID = 'Volunteer ID is required';
        if (!participation.ProjectID) newErrors.ProjectID = 'Project ID is required';
        if (!participation.Hours_Worked) newErrors.Hours_Worked = 'Hours Worked is required';
        if (!participation.Role) newErrors.Role = 'Role is required';
        if (!participation.Date_Joined) newErrors.Date_Joined = 'Date Joined is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await API.post('/volunteer-participation/add', participation);
            alert('Volunteer participation recorded successfully!');
            setParticipation({ VolunteerID: '', ProjectID: '', Hours_Worked: '', Role: '', Date_Joined: '' });
            setErrors({});
        } catch (error) {
            console.error(error);
            alert('Failed to record volunteer participation');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-volunteer-participation-container">
            <div className="form-card">
                <h2>Add Volunteer Participation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label><FaUser /> Volunteer ID <span className="required">*</span></label>
                        <input
                            type="number"
                            value={participation.VolunteerID}
                            onChange={e => setParticipation({ ...participation, VolunteerID: e.target.value })}
                            className={errors.VolunteerID ? 'input-error' : ''}
                        />
                        {errors.VolunteerID && <span className="error-message">{errors.VolunteerID}</span>}
                    </div>
                    <div className="form-group">
                        <label><FaProjectDiagram /> Project ID <span className="required">*</span></label>
                        <input
                            type="number"
                            value={participation.ProjectID}
                            onChange={e => setParticipation({ ...participation, ProjectID: e.target.value })}
                            className={errors.ProjectID ? 'input-error' : ''}
                        />
                        {errors.ProjectID && <span className="error-message">{errors.ProjectID}</span>}
                    </div>
                    <div className="form-group">
                        <label><FaClock /> Hours Worked <span className="required">*</span></label>
                        <input
                            type="number"
                            value={participation.Hours_Worked}
                            onChange={e => setParticipation({ ...participation, Hours_Worked: e.target.value })}
                            className={errors.Hours_Worked ? 'input-error' : ''}
                        />
                        {errors.Hours_Worked && <span className="error-message">{errors.Hours_Worked}</span>}
                    </div>
                    <div className="form-group">
                        <label><FaUserTie /> Role <span className="required">*</span></label>
                        <input
                            type="text"
                            value={participation.Role}
                            onChange={e => setParticipation({ ...participation, Role: e.target.value })}
                            className={errors.Role ? 'input-error' : ''}
                        />
                        {errors.Role && <span className="error-message">{errors.Role}</span>}
                    </div>
                    <div className="form-group">
                        <label><FaCalendarAlt /> Date Joined <span className="required">*</span></label>
                        <input
                            type="date"
                            value={participation.Date_Joined}
                            onChange={e => setParticipation({ ...participation, Date_Joined: e.target.value })}
                            className={errors.Date_Joined ? 'input-error' : ''}
                            max={today} // Restrict to today's date or earlier
                        />
                        {errors.Date_Joined && <span className="error-message">{errors.Date_Joined}</span>}
                    </div>
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add Participation'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddVolunteerParticipation;