import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/global.css";

const Register = () => {
    useEffect(() => {
        const handleScroll = () => {
            const cards = document.querySelectorAll('.register-card');
            
            cards.forEach((card, index) => {
                const cardTop = card.getBoundingClientRect().top;
                const triggerPoint = window.innerHeight * 0.8;
                
                if (cardTop < triggerPoint) {
                    setTimeout(() => {
                        card.classList.add('active');
                    }, index * 100); // Staggered animation
                }
            });
        };
        
        window.addEventListener('scroll', handleScroll);
        setTimeout(handleScroll, 300);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="page-container register-page">
            <Navbar />
            <div className="page-header join-header">
                <div className="container">
                    <span className="section-tag">Participate</span>
                    <h1 className="page-title">Join Our Mission</h1>
                    <div className="divider"></div>
                    <p className="page-subtitle">Choose how you'd like to contribute and make a lasting impact</p>
                </div>
            </div>

            <div className="container section-padding">
                <div className="register-grid">
                    {/* Donor */}
                    <div className="register-card animate-card">
                        <div className="card-icon-wrapper donor">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="8" r="7"></circle>
                                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                            </svg>
                        </div>
                        <h3>Become a Donor</h3>
                        <p>Your financial contributions directly fund education, healthcare, and vital community support. Help us create positive change with sustainable impact.</p>
                        <ul className="card-list">
                            <li>Support critical projects</li>
                            <li>Track your impact</li>
                            <li>Tax benefits available</li>
                        </ul>
                        <Link to="/register/donor" className="action-button">Register as a Donor</Link>
                    </div>

                    {/* Volunteer */}
                    <div className="register-card animate-card">
                        <div className="card-icon-wrapper volunteer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <h3>Volunteer with Us</h3>
                        <p>Use your time, passion, and skills to create meaningful impact. Join our community of dedicated volunteers making a difference on the ground.</p>
                        <ul className="card-list">
                            <li>Flexible time commitment</li>
                            <li>Various skill opportunities</li>
                            <li>On-site and remote options</li>
                        </ul>
                        <Link to="/register/volunteer" className="action-button">Join as a Volunteer</Link>
                    </div>

                    {/* Volunteer Participation */}
                    <div className="register-card animate-card">
                        <div className="card-icon-wrapper participation">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <line x1="12" y1="15" x2="12" y2="21"></line>
                                <path d="M15 12h4v4"></path>
                            </svg>
                        </div>
                        <h3>Volunteer Participation</h3>
                        <p>Already a volunteer? Log your participation details, track hours, and view project assignments. Stay engaged and make a bigger impact.</p>
                        <ul className="card-list">
                            <li>Record volunteering hours</li>
                            <li>Update participation details</li>
                            <li>Monitor project contributions</li>
                        </ul>
                        <Link to="/register/participation" className="action-button">Log Participation</Link>
                    </div>

                    {/* Project */}
                    <div className="register-card animate-card">
                        <div className="card-icon-wrapper project">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                        </div>
                        <h3>Start a Project</h3>
                        <p>Have a vision for community improvement? Initiate and manage projects that address specific needs and create lasting positive change.</p>
                        <ul className="card-list">
                            <li>Project development support</li>
                            <li>Access to resources</li>
                            <li>Guidance from experts</li>
                        </ul>
                        <Link to="/register/project" className="action-button">Propose a Project</Link>
                    </div>

                    {/* Donation */}
                    <div className="register-card animate-card">
                        <div className="card-icon-wrapper donation">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                                <line x1="2" y1="10" x2="22" y2="10"></line>
                            </svg>
                        </div>
                        <h3>Make a Donation</h3>
                        <p>Support ongoing projects through one-time or recurring financial contributions. Every donation, regardless of size, helps transform lives.</p>
                        <ul className="card-list">
                            <li>100% transparency</li>
                            <li>Choose specific causes</li>
                            <li>Regular impact updates</li>
                        </ul>
                        <Link to="/register/donation" className="action-button">Donate Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
