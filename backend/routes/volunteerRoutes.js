const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all volunteers
router.get('/', (req, res) => {
    db.query("SELECT * FROM Volunteers", (err, volunteers) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(volunteers);
    });
});

// Add a new volunteer along with their skills
router.post('/add', (req, res) => {
    const { FName, LName, Date_Joined, Contact_Number, Email, skills } = req.body;

    // Insert volunteer into Volunteers table
    db.query(
        "INSERT INTO Volunteers (FName, LName, Date_Joined, Contact_Number, Email) VALUES (?, ?, ?, ?, ?)",
        [FName, LName, Date_Joined, Contact_Number, Email],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            const volunteerID = result.insertId; // Get the newly inserted volunteer's ID

            // If no skills are provided, return success response
            if (!skills || skills.length === 0) {
                return res.json({ message: "Volunteer added successfully!", VolunteerID: volunteerID });
            }

            // Insert multiple skills for the volunteer
            const skillQueries = skills.map(skill => [volunteerID, skill]);
            db.query(
                "INSERT INTO Volunteer_SkillSet (VolunteerID, SkillSet) VALUES ?",
                [skillQueries],
                (skillErr) => {
                    if (skillErr) {
                        return res.status(500).json({ error: "Volunteer added, but skills failed to save.", details: skillErr.message });
                    }
                    res.json({ message: "Volunteer and skills added successfully!", VolunteerID: volunteerID });
                }
            );
        }
    );
});

module.exports = router;
