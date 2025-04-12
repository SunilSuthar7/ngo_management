const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Function to update project status automatically
const updateProjectStatus = async (projectId) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const query = `
        UPDATE Projects 
        SET Status = 'Completed'
        WHERE ProjectID = ? AND (
            (End_Date < ?) OR 
            (Budget_Raised >= Budget_Required)
        ) AND Status != 'Completed'
    `;
    
    return new Promise((resolve, reject) => {
        db.query(query, [projectId, currentDate], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// Get all projects with updated status
router.get('/', async (req, res) => {
    try {
        // First, update status for all projects
        const updateQuery = `
            UPDATE Projects 
            SET Status = 'Completed'
            WHERE (End_Date < CURDATE() OR Budget_Raised >= Budget_Required)
            AND Status != 'Completed'
        `;
        await new Promise((resolve, reject) => {
            db.query(updateQuery, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        // Then fetch all projects
        db.query("SELECT * FROM Projects", (err, projects) => {
            if (err) res.status(500).json({ error: err.message });
            else res.json(projects);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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

// Update project status when donation is made
router.post('/update-status/:id', async (req, res) => {
    try {
        await updateProjectStatus(req.params.id);
        res.json({ message: 'Project status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
