const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all volunteer participation records
router.get('/', (req, res) => {
    db.query("SELECT * FROM Volunteer_Participation", (err, records) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(records);
    });
});

// Add a new volunteer participation record
router.post('/add', (req, res) => {
    const { VolunteerID, ProjectID, Hours_Worked, Role, Date_Joined } = req.body;
    db.query("INSERT INTO Volunteer_Participation (VolunteerID, ProjectID, Hours_Worked, Role, Date_Joined) VALUES (?, ?, ?, ?, ?)",
        [VolunteerID, ProjectID, Hours_Worked, Role, Date_Joined],
        (err, result) => {
            if (err) res.status(500).json({ error: err.message });
            else res.json({ message: "Volunteer participation record added successfully!" });
        });
});

module.exports = router;
