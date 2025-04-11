import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import Dashboard from './Dashboard';

const Home = () => {
    // Add scroll animation effect
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.animate-on-scroll');
            
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const triggerPoint = window.innerHeight * 0.8;
                
                if (sectionTop < triggerPoint) {
                    section.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', handleScroll);
        // Trigger once on load
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <div className="home-container">
            {/* Enhanced Hero Section */}
            <section id="welcome" className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Welcome to <span className="highlight">NGO Connect</span>
                    </h1>
                    <p className="hero-subtitle">
                        Transforming lives through meaningful initiatives that create lasting change
                    </p>
                    <a href="#about" className="cta-button">
                        Discover Our Mission <span className="arrow">↓</span>
                    </a>
                </div>
                <div className="hero-overlay"></div>
            </section>

            {/* About Us Section */}
            <section id="about" className="about-section animate-on-scroll">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">About Us</span>
                        <h2 className="section-title">Our Mission & Vision</h2>
                        <div className="divider"></div>
                    </div>
                    
                    <div className="about-content">
                        <p className="about-text">
                            NGO Connect is dedicated to empowering underprivileged communities through education, 
                            healthcare, and social support. We believe in bridging the gap between those who want 
                            to help and those who need it most.
                        </p>
                        <p className="about-text">
                            Our initiatives focus on sustainable development, ensuring that each project creates 
                            a long-term impact. With the support of our donors and volunteers, we provide scholarships, 
                            organize medical camps, and support women empowerment programs.
                        </p>
                        <p className="about-text">
                            Our transparency and accountability ensure that every donation directly contributes 
                            to meaningful change. Whether it's rebuilding schools or providing food security, 
                            every effort counts in making the world a better place. Join us in our journey to 
                            transform lives and bring hope to those in need.
                        </p>
                    </div>
                </div>
            </section>

            {/* Dashboard Section */}
            <Dashboard />

            {/* Get Involved Section */}
            <section id="options" className="options-section animate-on-scroll">
                <div className="container">
                    <div className="section-header light">
                        <span className="section-tag">Get Involved</span>
                        <h2 className="section-title">Make an Impact Today</h2>
                        <div className="divider light"></div>
                    </div>
                    
                    <div className="options-grid">
                        <div className="option-card">
                            <div className="card-icon">
                                <span role="img" aria-label="magnifying glass">🔍</span>
                            </div>
                            <h3 className="card-title">Explore</h3>
                            <p className="card-text">
                                Discover our donors, volunteers, and projects making an impact around the world.
                            </p>
                            <Link to="/view-details" className="card-button">
                                Explore Now
                            </Link>
                        </div>
                        
                        <div className="option-card">
                            <div className="card-icon">
                                <span role="img" aria-label="raised hand">✋</span>
                            </div>
                            <h3 className="card-title">Join Us</h3>
                            <p className="card-text">
                                Become a donor, volunteer, or start a new initiative with us to help those in need.
                            </p>
                            <Link to="/register" className="card-button">
                                Register Today
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;