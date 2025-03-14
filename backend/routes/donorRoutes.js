const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all donors
router.get('/', (req, res) => {
    db.query("SELECT * FROM Donors", (err, donors) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(donors);
    });
});

// Add a new donor
router.post('/add', (req, res) => {
    const { FName, LName, Address, Contact_Number, Email, Total_Donated_Amount } = req.body;
    db.query("INSERT INTO Donors (FName, LName, Address, Contact_Number, Email, Total_Donated_Amount) VALUES (?, ?, ?, ?, ?, ?)",
        [FName, LName, Address, Contact_Number, Email, Total_Donated_Amount],
        (err, result) => {
            if (err) res.status(500).json({ error: err.message });
            else res.json({ message: "Donor added successfully!" });
        });
});

module.exports = router;
