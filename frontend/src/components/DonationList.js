import React, { useState, useEffect } from 'react';
import API from '../services/api';
import '../styles/global.css';
import { FaRupeeSign, FaUser, FaProjectDiagram, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

const DonationList = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        API.get('/donations')
           .then(res => {
               setDonations(res.data);
               setLoading(false);
           })
           .catch(err => {
               console.error(err);
               setError('Failed to load donations');
               setLoading(false);
           });
    }, []);

    // Format currency in Indian Rupees format
    const formatCurrency = (amount) => {
        if (amount === undefined || amount === null) return '₹0';
        return `₹${parseFloat(amount).toLocaleString('en-IN')}`;
    };

    // Format date to a readable format
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN');
    };

    if (loading) return <div className="loading">Loading donations...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="donation-list">
            <div className="container">
                <h2>Donations</h2>
                <div className="donation-grid">
                    {donations.length === 0 ? (
                        <p>No donations available</p>
                    ) : (
                        donations.map(donation => (
                            <div key={donation.DonationID} className="donation-card">
                                <div className="donation-header">
                                    <div className="donation-icon">
                                        <FaRupeeSign />
                                    </div>
                                    <h3>Donation ID: {donation.DonationID}</h3>
                                </div>
                                
                                <div className="donation-details">
                                    <div className="donation-detail">
                                        <FaMoneyBillWave />
                                        <span className="detail-label">Amount:</span>
                                        <span className="detail-value">{formatCurrency(donation.Amount)}</span>
                                    </div>

                                    <div className="donation-detail">
                                        <FaUser />
                                        <span className="detail-label">Donor ID:</span>
                                        <span className="detail-value">{donation.DonorID}</span>
                                    </div>

                                    <div className="donation-detail">
                                        <FaProjectDiagram />
                                        <span className="detail-label">Project ID:</span>
                                        <span className="detail-value">{donation.ProjectID}</span>
                                    </div>

                                    <div className="donation-detail">
                                        <FaMoneyBillWave />
                                        <span className="detail-label">Payment Mode:</span>
                                        <span className="detail-value">{donation.PayMode}</span>
                                    </div>

                                    <div className="donation-detail">
                                        <FaCalendarAlt />
                                        <span className="detail-label">Date:</span>
                                        <span className="detail-value">{formatDate(donation.Donation_Date)}</span>
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

export default DonationList;
