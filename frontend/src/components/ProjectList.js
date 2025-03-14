import React, { useState, useEffect } from 'react';
import API from '../services/api';
import '../styles/global.css';
import { FaTasks, FaMoneyBillWave, FaChartLine, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        API.get('/projects')
           .then(res => {
               // Process text fields to fix encoding issues before setting state
               const processedProjects = res.data.map(project => ({
                   ...project,
                   Project_Name: fixTextEncoding(project.Project_Name),
                   Description: fixTextEncoding(project.Description)
               }));
               setProjects(processedProjects);
               setLoading(false);
           })
           .catch(err => {
               console.error(err);
               setError('Failed to load projects');
               setLoading(false);
           });
    }, []);

    // Calculate percentage of budget raised
    const calculateProgress = (raised, required) => {
        if (!raised || !required || required === 0) return 0;
        return Math.min((raised / required) * 100, 100); // Cap at 100%
    };

    // Format date to a readable format
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN');
    };

    // Format currency in Indian Rupees format
    const formatCurrency = (amount) => {
        if (amount === undefined || amount === null) return '₹0';
        return `₹${parseFloat(amount).toLocaleString('en-IN')}`;
    };

    // Fix Unicode encoding issues in text
    const fixTextEncoding = (text) => {
        if (!text) return '';
        
        // Hard-code specific fixes for known problematic phrases
        if (text.includes("women") && (text.includes("ÔÇÖs") || text.includes("''s"))) {
            return text.replace(/women(ÔÇÖs|''s)/g, "women's");
        }
        
        // Fix any double apostrophes
        return text.replace(/''/g, "'");
    };

    if (loading) return <div className="loading">Loading projects...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="project-list">
            <div className="container">
                <h2>Projects</h2>
                <div className="project-grid">
                    {projects.length === 0 ? (
                        <p>No projects available</p>
                    ) : (
                        projects.map(project => (
                            <div key={project.ProjectID} className="project-card">
                                <div className="project-header">
                                    <div className="project-icon">
                                        <FaTasks />
                                    </div>
                                    <h3>{project.Project_Name}</h3>
                                </div>
                                
                                {project.Description && (
                                    <div className="project-description">
                                        <FaInfoCircle />
                                        <p>
                                            {project.Description.length > 100 
                                                ? project.Description.substring(0, 100) + '...'
                                                : project.Description
                                            }
                                        </p>
                                    </div>
                                )}
                                
                                <div className="project-dates">
                                    <FaCalendarAlt />
                                    <span>Start: {formatDate(project.Start_Date)}</span>
                                    {project.End_Date && 
                                        <span> - End: {formatDate(project.End_Date)}</span>
                                    }
                                </div>
                                
                                <div className="project-details">
                                    <div className="project-status">
                                        <FaChartLine />
                                        <span>Status: {project.Status || 'Ongoing'}</span>
                                    </div>
                                    
                                    <div className="project-budget">
                                        <FaMoneyBillWave />
                                        <div className="budget-info">
                                            <div>Required: <strong>{formatCurrency(project.Budget_Required)}</strong></div>
                                            <div>Raised: <strong>{formatCurrency(project.Budget_Raised)}</strong></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="budget-progress">
                                    <div className="progress-bar">
                                        <div 
                                            className="progress-fill" 
                                            style={{width: `${calculateProgress(project.Budget_Raised, project.Budget_Required)}%`}}
                                        ></div>
                                    </div>
                                    <div className="progress-percentage">
                                        {Math.round(calculateProgress(project.Budget_Raised, project.Budget_Required))}% funded
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectList;