import React, { useEffect, useState } from 'react';
import API from '../services/api';
import '../styles/global.css';

const Dashboard = () => {
    const [data, setData] = useState({
        totalDonors: 0,
        totalDonations: 0,
        totalProjects: 0,
        totalVolunteers: 0,
        maxDonation: 0
    });

    useEffect(() => {
        API.get('/dashboard/aggregates')
            .then(res => setData(res.data))
            .catch(err => console.error('Failed to fetch dashboard data:', err));
    }, []);

    return (
        <section className="dashboard-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Dashboard</span>
                    <h2 className="section-title">Our Impact at a Glance</h2>
                    <div className="divider"></div>
                </div>
                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>Total Donors</h3>
                        <p>{data.totalDonors}</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Total Donations</h3>
                        <p>₹{data.totalDonations.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Total Projects</h3>
                        <p>{data.totalProjects}</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Total Volunteers</h3>
                        <p>{data.totalVolunteers}</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Max Donation</h3>
                        <p>₹{data.maxDonation.toLocaleString('en-IN')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
