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
                        <p>Meet the generous individuals and organizations whose financial support makes our work possible.</p>
                        <Link to="/donor-list" className="card-button">Browse Donors</Link>
                    </div>
                    
                    <div className="details-card animate-card">
                        <div className="card-icon">
                            <span role="img" aria-label="handshake">🤝</span>
                        </div>
                        <h3>Volunteers</h3>
                        <p>Discover the dedicated individuals making a real difference on the ground.</p>
                        <Link to="/volunteer-list" className="card-button">Meet Volunteers</Link>
                    </div>
                    
                    <div className="details-card animate-card">
                        <div className="card-icon">
                            <span role="img" aria-label="building construction">🏗️</span>
                        </div>
                        <h3>Projects</h3>
                        <p>See the impact of transformative initiatives providing education, healthcare, and essential support.</p>
                        <Link to="/project-list" className="card-button">Explore Projects</Link>
                    </div>
                    
                    <div className="details-card animate-card">
                        <div className="card-icon">
                            <span role="img" aria-label="money with wings">💸</span>
                        </div>
                        <h3>Donations</h3>
                        <p>Track how donations are allocated and utilized to create meaningful change.</p>
                        <Link to="/donation-list" className="card-button">View Donations</Link>
                    </div>
                    
                    <div className="details-card animate-card">
                        <div className="card-icon">
                            <span role="img" aria-label="bar chart">📊</span>
                        </div>
                        <h3>Volunteer Participation</h3>
                        <p>Explore the diverse contributions of our volunteers across projects.</p>
                        <Link to="/volunteer-participation-list" className="card-button">See Participation</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;