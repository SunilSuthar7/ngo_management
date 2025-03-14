import React, { useState } from 'react';
import API from '../services/api';
import '../styles/register.css';
import { FaProjectDiagram, FaAlignLeft, FaCalendarAlt, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';

const AddProject = () => {
    const [project, setProject] = useState({ Project_Name: '', Description: '', Start_Date: '', End_Date: '', Status: 'Ongoing', Budget_Required: '', Budget_Raised: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!project.Project_Name) newErrors.Project_Name = 'Project Name is required';
        if (!project.Description) newErrors.Description = 'Description is required';
        if (!project.Start_Date) newErrors.Start_Date = 'Start Date is required';
        if (!project.End_Date) newErrors.End_Date = 'End Date is required';
        if (!project.Budget_Required) newErrors.Budget_Required = 'Budget Required is required';
        if (!project.Budget_Raised) newErrors.Budget_Raised = 'Budget Raised is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await API.post('/projects/add', project);
            alert('Project added successfully!');
            setProject({ Project_Name: '', Description: '', Start_Date: '', End_Date: '', Status: 'Ongoing', Budget_Required: '', Budget_Raised: '' });
            setErrors({});
        } catch (error) {
            console.error(error);
            alert('Failed to add project');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-project-container">
            <div className="form-card">
                <h2>Add Project</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label><FaProjectDiagram /> Project Name <span className="required">*</span></label>
                        <input
                            type="text"
                            value={project.Project_Name}
                            onChange={e => setProject({ ...project, Project_Name: e.target.value })}
                            className={errors.Project_Name ? 'input-error' : ''}
                        />
                        {errors.Project_Name && <span className="error-message">{errors.Project_Name}</span>}
                    </div>
                    <div className="form-group">
                        <label><FaAlignLeft /> Description <span className="required">*</span></label>
                        <textarea
                            value={project.Description}
                            onChange={e => setProject({ ...project, Description: e.target.value })}
                            className={errors.Description ? 'input-error' : ''}
                        />
                        {errors.Description && <span className="error-message">{errors.Description}</span>}
                    </div>
                    <div className="form-group">
                        <label><FaCalendarAlt /> Start Date <span className="required">*</span></label>
                        <input
                            type="date"
                            value={project.Start_Date}
                            onChange={e => setProject({ ...project, Start_Date: e.target.value })}
                            className={errors.Start_Date ? 'input-error' : ''}
                        />
                        {errors.Start_Date && <span className="error-message">{errors.Start_Date}</span>}
                    </div>
                    <div className="form-group">
                        <label><FaCalendarAlt /> End Date <span className="required">*</span></label>
                        <input
                            type="date"
                            value={project.End_Date}
                            onChange={e => setProject({ ...project, End_Date: e.target.value })}
                            className={errors.End_Date ? 'input-error' : ''}
                        />
                        {errors.End_Date && <span className="error-message">{errors.End_Date}</span>}
                    </div>
                    <div className="form-group">
                        <label><FaCheckCircle /> Status <span className="required">*</span></label>
                        <select
                            value={project.Status}
                            onChange={e => setProject({ ...project, Status: e.target.value })}
                            className={errors.Status ? 'input-error' : ''}
                        >
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                        </select>
                        {errors.Status && <span className="error-message">{errors.Status}</span>}
                    </div>
                    <div className="form-group">
                        <label><FaMoneyBillWave /> Budget Required <span className="required">*</span></label>
                        <input
                            type="number"
                            value={project.Budget_Required}
                            onChange={e => setProject({ ...project, Budget_Required: e.target.value })}
                            className={errors.Budget_Required ? 'input-error' : ''}
                        />
                        {errors.Budget_Required && <span className="error-message">{errors.Budget_Required}</span>}
                    </div>
                    <div className="form-group">
                        <label><FaMoneyBillWave /> Budget Raised <span className="required">*</span></label>
                        <input
                            type="number"
                            value={project.Budget_Raised}
                            onChange={e => setProject({ ...project, Budget_Raised: e.target.value })}
                            className={errors.Budget_Raised ? 'input-error' : ''}
                        />
                        {errors.Budget_Raised && <span className="error-message">{errors.Budget_Raised}</span>}
                    </div>
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add Project'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProject;