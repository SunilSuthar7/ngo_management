const express = require('express');
const cors = require('cors');
require('dotenv').config();
const donorRoutes = require('./routes/donorRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const projectRoutes = require('./routes/projectRoutes');
const donationRoutes = require('./routes/donationRoutes');
const volunteerParticipationRoutes = require('./routes/volunteerParticipationRoutes');
const volunteerSkillRoutes = require('./routes/volunteerSkillRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/donors', donorRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/volunteer-participation', volunteerParticipationRoutes);
app.use('/api/volunteer-skills', volunteerSkillRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send("✅ NGO Management System API is Running... Check API docs for usage.");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 API Base URL: http://localhost:${PORT}/`);
    console.log(`📌 Donors API: http://localhost:${PORT}/api/donors`);
    console.log(`📌 Volunteers API: http://localhost:${PORT}/api/volunteers`);
    console.log(`📌 Projects API: http://localhost:${PORT}/api/projects`);
    console.log(`📌 Donations API: http://localhost:${PORT}/api/donations`);
    console.log(`📌 Volunteer Participation API: http://localhost:${PORT}/api/volunteer-participation`);
    console.log(`📌 Volunteer Skills API: http://localhost:${PORT}/api/volunteer-skills/:volunteerID`);
});
