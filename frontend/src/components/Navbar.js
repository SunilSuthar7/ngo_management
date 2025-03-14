import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/global.css";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    
    // Add scroll effect to navbar
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);
    
    // Close mobile menu when changing routes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);
    
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    
    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                {/* Logo */}
                <Link to="/" className="logo">
                    <span className="logo-icon" role="img" aria-label="Globe">🌍</span>
                    <span className="logo-text">NGO Connect</span>
                </Link>
                
                {/* Mobile menu toggle */}
                <div 
                    className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
                    onClick={toggleMobileMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                
                {/* Navigation links */}
                <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                    <li className={location.pathname === '/' ? 'active' : ''}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={location.pathname === '/view-details' ? 'active' : ''}>
                        <Link to="/view-details">Explore</Link>
                    </li>
                    <li className={location.pathname === '/register' ? 'active' : ''}>
                        <Link to="/register">Join Us</Link>
                    </li>
                    <li>
                        {/* "Donate Now" button now correctly routes to /register/donation */}
                        <Link to="/register/donation" className="nav-button">Donate Now</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
