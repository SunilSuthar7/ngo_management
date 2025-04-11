import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const NotAuthorized = () => {
    return (
        <div className="not-authorized-container">
            <div className="not-authorized-card">
                <h1>🚫 Access Denied</h1>
                <p>Sorry, you do not have permission to access this page.</p>
                <Link to="/" className="back-home-button">Go Back to Home</Link>
            </div>
        </div>
    );
};

export default NotAuthorized;
