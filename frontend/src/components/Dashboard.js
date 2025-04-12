import React, { useEffect, useState } from 'react';
import API from '../services/api';
import '../styles/global.css';
import './Dashboard.css';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ErrorBoundary from './ErrorBoundary';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    const [data, setData] = useState({});
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        API.get('/dashboard/aggregates')
            .then(res => {
                const filteredData = {
                    ...res.data,
                    totalProjects: res.data.totalProjects - res.data.completedProjects
                };
                setData(filteredData);
                setProjects(res.data.projects || []);
            })
            .catch(err => console.error(err));
    }, []);

    const filteredProjects = projects.filter(project => project.status !== 'Completed');

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 14
                },
                bodyFont: {
                    size: 13
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    const donationData = {
        labels: ['Total Donations', 'Max Donation', 'Avg Donation'],
        datasets: [{
            label: 'Donation Metrics (₹)',
            data: [data.totalDonations || 0, data.maxDonation || 0, data.avgDonation || 0],
            backgroundColor: ['#4CAF50', '#2196F3', '#FFC107'],
            borderColor: ['#388E3C', '#1976D2', '#FFA000'],
            borderWidth: 1,
            borderRadius: 6,
            hoverOffset: 4
        }]
    };

    const volunteerData = {
        labels: ['Total Volunteers', 'Total Hours Worked'],
        datasets: [{
            label: 'Volunteer Metrics',
            data: [data.totalVolunteers || 0, data.totalVolunteerHours || 0],
            backgroundColor: ['#9C27B0', '#E91E63'],
            borderColor: ['#7B1FA2', '#C2185B'],
            borderWidth: 1,
            hoverOffset: 4
        }]
    };

    const formatAmount = (amount) => {
        if (amount === undefined || amount === null) return '₹0';
        return `₹${parseFloat(amount).toLocaleString('en-IN')}`;
    };

    return (
        <ErrorBoundary>
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
                            <p>{data.totalDonors || 'Loading...'}</p>
                        </div>
                        <div className="dashboard-card">
                            <h3>Active Projects</h3>
                            <p>{data.totalProjects || 'Loading...'}</p>
                        </div>
                        <div className="dashboard-card">
                            <h3>Total Volunteers</h3>
                            <p>{data.totalVolunteers || 'Loading...'}</p>
                        </div>
                        <div className="dashboard-card">
                            <h3>Highest Donor</h3>
                            <p>{data.highestDonor?.Name || 'No donors yet'}</p>
                            <p>{formatAmount(data.highestDonor?.Donation)}</p>
                        </div>
                        <div className="dashboard-card">
                            <h3>Lowest Donor</h3>
                            <p>{data.lowestDonor?.Name || 'No donors yet'}</p>
                            <p>{formatAmount(data.lowestDonor?.Donation)}</p>
                        </div>
                        <div className="dashboard-card">
                            <h3>Top Volunteer</h3>
                            <p>{data.topVolunteer?.Name || 'No volunteers yet'}</p>
                            <p>{data.topVolunteer?.Hours || 0} hours</p>
                        </div>
                        <div className="dashboard-card">
                            <h3>Project with Most Volunteers</h3>
                            <p>{data.projectWithMostVolunteers?.Project_Name || 'No projects yet'} ({data.projectWithMostVolunteers?.VolunteerCount || 0} volunteers)</p>
                        </div>
                    </div>
                    <div className="chart-section">
                        <div className="chart-container">
                            <h3>Donation Metrics</h3>
                            <Bar data={donationData} options={chartOptions} />
                        </div>
                        <div className="chart-container small-chart">
                            <h3>Volunteer Metrics</h3>
                            <Pie data={volunteerData} options={{
                                ...chartOptions,
                                scales: undefined
                            }} />
                        </div>
                    </div>
                </div>
            </section>
        </ErrorBoundary>
    );
};

export default Dashboard;
