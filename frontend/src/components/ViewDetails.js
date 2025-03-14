import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/global.css";

const ViewDetails = () => {
    // Add scroll animation effect
    useEffect(() => {
        const handleScroll = () => {
            const cards = document.querySelectorAll('.details-card');
            
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
        // Trigger once on load
        setTimeout(handleScroll, 300);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <div className="page-container details-page">
            <Navbar />
            <div className="page-header">
                <div className="container">
                    <span className="section-tag">Discover</span>
                    <h1 className="page-title">Explore Our Impact</h1>
                    <div className="divider"></div>
                    <p className="page-subtitle">Connect with the people and initiatives driving meaningful change around the world</p>
                </div>
            </div>

            <div className="container section-padding">
                <div className="details-grid">
                    <div className="details-card animate-card">
                        <div className="card-icon">
                            <span role="img" aria-label="money bag">💰</span>
                        </div>
                        <h3>Donors</h3>
                        <p>Meet the generous individuals and organizations whose financial support makes our work possible. Learn about their stories and the causes they champion.</p>
                        <Link to="/donor-list" className="card-button">
                            Browse Donors
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </div>
                    
                    <div className="details-card animate-card">
                        <div className="card-icon">
                            <span role="img" aria-label="handshake">🤝</span>
                        </div>
                        <h3>Volunteers</h3>
                        <p>Dedicated individuals making a real difference on the ground. Discover their motivations, skills, and the transformation they bring to communities.</p>
                        <Link to="/volunteer-list" className="card-button">
                            Meet Volunteers
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </div>
                    
                    <div className="details-card animate-card">
                        <div className="card-icon">
                            <span role="img" aria-label="building construction">🏗️</span>
                        </div>
                        <h3>Projects</h3>
                        <p>Transformative initiatives providing education, healthcare, and essential support. See the impact of each project and the communities they serve.</p>
                        <Link to="/project-list" className="card-button">
                            Explore Projects
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </div>
                    
                    <div className="details-card animate-card">
                        <div className="card-icon">
                            <span role="img" aria-label="money with wings">💸</span>
                        </div>
                        <h3>Donations</h3>
                        <p>Transparency in action. Track how donations are allocated and utilized to create meaningful change in the lives of those who need it most.</p>
                        <Link to="/donation-list" className="card-button">
                            View Donations
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </div>
                    
                    <div className="details-card animate-card">
                        <div className="card-icon">
                            <span role="img" aria-label="bar chart">📊</span>
                        </div>
                        <h3>Volunteer Participation</h3>
                        <p>Explore the diverse contributions of our volunteers across projects. Learn about their impact, hours contributed, and skills shared.</p>
                        <Link to="/volunteer-participation-list" className="card-button">
                            See Participation
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;