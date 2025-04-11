const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/aggregates', async (req, res) => {
    try {
        const queries = {
            totalDonors: "SELECT COUNT(*) AS totalDonors FROM Donors",
            totalDonations: "SELECT SUM(Amount) AS totalDonations FROM Donations",
            totalProjects: "SELECT COUNT(*) AS totalProjects FROM Projects",
            totalVolunteers: "SELECT COUNT(*) AS totalVolunteers FROM Volunteers",
            maxDonation: "SELECT MAX(Amount) AS maxDonation FROM Donations"
        };

        const results = await Promise.all(Object.values(queries).map(query => new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
        })));

        res.json({
            totalDonors: results[0].totalDonors,
            totalDonations: results[1].totalDonations || 0,
            totalProjects: results[2].totalProjects,
            totalVolunteers: results[3].totalVolunteers,
            maxDonation: results[4].maxDonation || 0
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
});

module.exports = router;
