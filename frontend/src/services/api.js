import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const getVolunteerSkills = (volunteerID) => API.get(`/volunteer-skills/${volunteerID}`)
    .then(res => res.data || [])  // 🔥 Fix: Ensures frontend handles empty responses
    .catch(() => []);  // 🔥 Fix: Prevents errors from breaking the UI

export const addVolunteerSkill = (data) => API.post(`/volunteer-skills/add`, data);
export const removeVolunteerSkill = (data) => API.delete(`/volunteer-skills/remove`, { data });

export default API;
