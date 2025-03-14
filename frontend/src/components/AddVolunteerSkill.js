import React, { useState } from 'react';
import { addVolunteerSkill } from '../services/api';
import '../styles/global.css';

const AddVolunteerSkill = () => {
    const [skillData, setSkillData] = useState({ VolunteerID: '', SkillSet: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addVolunteerSkill(skillData);
        alert('Skill added successfully!');
    };

    return (
        <div className="container">
            <h2>Add Skill to Volunteer</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Volunteer ID" required onChange={e => setSkillData({...skillData, VolunteerID: e.target.value})} />
                <input type="text" placeholder="Skill" required onChange={e => setSkillData({...skillData, SkillSet: e.target.value})} />
                <button type="submit" className="btn-green">Add Skill</button>
            </form>
        </div>
    );
};

export default AddVolunteerSkill;
