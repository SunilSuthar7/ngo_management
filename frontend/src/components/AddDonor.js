import React, { useState } from 'react';
import API from '../services/api';
import '../styles/register.css';
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope,  FaRupeeSign } from 'react-icons/fa';

const AddDonor = () => {
    const [donor, setDonor] = useState({ FName: '', LName: '', Address: '', Contact_Number: '', Email: '', Total_Donated_Amount: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!donor.FName) newErrors.FName = 'First Name is required';
        if (!donor.Address) newErrors.Address = 'Address is required';
        if (!donor.Contact_Number) newErrors.Contact_Number = 'Contact Number is required';
        if (!donor.Email) {
            newErrors.Email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(donor.Email)) {
            newErrors.Email = 'Email is invalid';
        }
        if (!donor.Total_Donated_Amount) newErrors.Total_Donated_Amount = 'Total Donated Amount is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await API.post('/donors/add', donor);
            alert('Donor added successfully!');
            setDonor({ FName: '', LName: '', Address: '', Contact_Number: '', Email: '', Total_Donated_Amount: '' });
            setErrors({});
        } catch (error) {
            console.error(error);
            alert('Failed to add donor');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-donor-container">
            <div className="form-card">
                <h2>Add Donor</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label><FaUser /> First Name <span className="required">*</span></label>
                        <input
                            type="text"
                            value={donor.FName}
                            onChange={e => setDonor({ ...donor, FName: e.target.value })}
                            className={errors.FName ? 'input-error' : ''}
                        />
                        {errors.FName && <span className="error-message">{errors.FName}</span>}
                    </div>
                    <div className="form-group">
                        <label><FaUser /> Last Name</label>
                        <input
                            type="text"
                            value={donor.LName}
                            onChange={e => setDonor({ ...donor, LName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label><FaMapMarkerAlt /> Address <span className="required">*</span></label>
                        <input
                            type="text"
                            value={donor.Address}
                            onChange={e => setDonor({ ...donor, Address: e.target.value })}
                            className={errors.Address ? 'input-error' : ''}
                        />
                        {errors.Address && <span className="error-message">{errors.Address}</span>}
                    </div>
                    <div className="form-group">
                        <label><FaPhone style={{ transform: 'scaleX(-1)' }} />Contact Number <span className="required">*</span></label>
                        <input
                            type="text"
                            value={donor.Contact_Number}
                            onChange={e => setDonor({ ...donor, Contact_Number: e.target.value })}
                            className={errors.Contact_Number ? 'input-error' : ''}
                        />
                        {errors.Contact_Number && <span className="error-message">{errors.Contact_Number}</span>}
                    </div>
                    <div className="form-group">
                        <label><FaEnvelope /> Email <span className="required">*</span></label>
                        <input
                            type="email"
                            value={donor.Email}
                            onChange={e => setDonor({ ...donor, Email: e.target.value })}
                            className={errors.Email ? 'input-error' : ''}
                        />
                        {errors.Email && <span className="error-message">{errors.Email}</span>}
                    </div>
                    <div className="form-group">
                    <label>
    <FaRupeeSign className="rupee-icon" /> Total Donated Amount <span className="required">*</span>
</label>

                        <input
                            type="number"
                            value={donor.Total_Donated_Amount}
                            onChange={e => setDonor({ ...donor, Total_Donated_Amount: e.target.value })}
                            className={errors.Total_Donated_Amount ? 'input-error' : ''}
                        />
                        {errors.Total_Donated_Amount && <span className="error-message">{errors.Total_Donated_Amount}</span>}
                    </div>
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add Donor'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDonor;