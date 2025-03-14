import React, { useState, useEffect } from 'react';
import API from '../services/api';
import '../styles/global.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';

const DonorList = () => {
    const [donors, setDonors] = useState([]);

    useEffect(() => {
        API.get('/donors')
           .then(res => setDonors(res.data))
           .catch(err => console.error(err));
    }, []);

    // Helper function to format amount safely in Rupees
    const formatAmount = (amount) => {
        // Convert to number if it's a string, or default to 0 if null/undefined
        const numAmount = amount ? parseFloat(amount) : 0;
        return numAmount.toFixed(2);
    };

    return (
        <div className="donor-list">
            <div className="container">
                <h2>Donors</h2>
                <div className="donor-grid">
                    {donors.map(donor => (
                        <div key={donor.DonorID} className="donor-card">
                            <div className="donor-icon">
                                <FaUser />
                            </div>
                            <h3>{donor.FName} {donor.LName || ''}</h3>
                            <div className="donor-email">
                                <FaEnvelope />
                                <span>{donor.Email}</span>
                            </div>
                            <div className="donor-phone">
                                <FaPhone style={{ transform: 'scaleX(-1)' }} />
                                <span>{donor.Contact_Number}</span>
                            </div>
                            <div className="donor-address">
                                <FaMapMarkerAlt />
                                <span>{donor.Address}</span>
                            </div>
                            <div className="donor-total">
                                <FaRupeeSign />
                                <span style={{ marginLeft: '8px' }}>₹{formatAmount(donor.Total_Donated_Amount)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DonorList;