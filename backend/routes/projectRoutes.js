const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all projects
router.get('/', (req, res) => {
    db.query("SELECT * FROM Projects", (err, projects) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(projects);
    });
});

// Add a new project
router.post('/add', (req, res) => {
    const { Project_Name, Description, Start_Date, End_Date, Status, Budget_Required, Budget_Raised } = req.body;
    db.query("INSERT INTO Projects (Project_Name, Description, Start_Date, End_Date, Status, Budget_Required, Budget_Raised) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [Project_Name, Description, Start_Date, End_Date, Status, Budget_Required, Budget_Raised],
        (err, result) => {
            if (err) res.status(500).json({ error: err.message });
            else res.json({ message: "Project added successfully!" });
        });
});

module.exports = router;
