import React, { useState } from 'react';
import API from '../services/api';
import '../styles/register.css';
import { FaUser, FaProjectDiagram, FaRupeeSign, FaCreditCard, FaCalendarAlt } from 'react-icons/fa';

const AddDonation = () => {
    const [donation, setDonation] = useState({
        DonorID: '',
        ProjectID: '',
        Amount: '',
        PayMode: 'Online',
        Donation_Date: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    const validateForm = () => {
        const newErrors = {};
        if (!donation.DonorID) newErrors.DonorID = 'Donor ID is required';
        if (!donation.ProjectID) newErrors.ProjectID = 'Project ID is required';
        if (!donation.Amount) newErrors.Amount = 'Amount is required';
        if (!donation.Donation_Date) newErrors.Donation_Date = 'Donation Date is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await API.post('/donations/add', donation);
            alert('Donation recorded successfully!');
            setDonation({ DonorID: '', ProjectID: '', Amount: '', PayMode: 'Online', Donation_Date: '' });
            setErrors({});
        } catch (error) {
            console.error(error);
            alert('Failed to record donation');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-donor-container">
            <div className="form-card">
                <h2>Add Donation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label><FaUser /> Donor ID <span className="required">*</span></label>
                        <input
                            type="number"
                            value={donation.DonorID}
                            onChange={e => setDonation({ ...donation, DonorID: e.target.value })}
                            className={errors.DonorID ? 'input-error' : ''}
                        />
                        {errors.DonorID && <span className="error-message">{errors.DonorID}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label><FaProjectDiagram /> Project ID <span className="required">*</span></label>
                        <input
                            type="number"
                            value={donation.ProjectID}
                            onChange={e => setDonation({ ...donation, ProjectID: e.target.value })}
                            className={errors.ProjectID ? 'input-error' : ''}
                        />
                        {errors.ProjectID && <span className="error-message">{errors.ProjectID}</span>}
                    </div>

                    <div className="form-group">
                        <label><FaRupeeSign /> Amount <span className="required">*</span></label>
                        <input
                            type="number"
                            value={donation.Amount}
                            onChange={e => setDonation({ ...donation, Amount: e.target.value })}
                            className={errors.Amount ? 'input-error' : ''}
                        />
                        {errors.Amount && <span className="error-message">{errors.Amount}</span>}
                    </div>

                    <div className="form-group">
                        <label><FaCreditCard /> Payment Mode</label>
                            <select 
                                    required 
                                    value={donation.PayMode} 
                                    onChange={e => setDonation({...donation, PayMode: e.target.value})} 
                                    className="input-field">
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                             </select>

                    </div>

                    <div className="form-group">
                        <label><FaCalendarAlt /> Donation Date <span className="required">*</span></label>
                        <input
                            type="date"
                            value={donation.Donation_Date}
                            onChange={e => setDonation({ ...donation, Donation_Date: e.target.value })}
                            max={today} // Restrict to today's date or earlier
                            className={errors.Donation_Date ? 'input-error' : ''}
                        />
                        {errors.Donation_Date && <span className="error-message">{errors.Donation_Date}</span>}
                    </div>

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add Donation'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDonation;
