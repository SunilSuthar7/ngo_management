const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/aggregates', async (req, res) => {
    try {
        const queries = {
            totalDonors: "SELECT COUNT(*) AS totalDonors FROM Donors",
            totalDonations: "SELECT SUM(Amount) AS totalDonations FROM Donations",
            totalProjects: "SELECT COUNT(*) AS totalProjects FROM Projects WHERE Status != 'Completed'",
            totalVolunteers: "SELECT COUNT(*) AS totalVolunteers FROM Volunteers",
            maxDonation: "SELECT MAX(Amount) AS maxDonation FROM Donations",
            avgDonation: "SELECT AVG(Amount) AS avgDonation FROM Donations",
            totalVolunteerHours: "SELECT SUM(Hours_Worked) AS totalVolunteerHours FROM Volunteer_Participation",
            completedProjects: "SELECT COUNT(*) AS completedProjects FROM Projects WHERE Status = 'Completed'",
            highestDonor: "SELECT CONCAT(FName, ' ', LName) AS Name, Total_Donated_Amount AS Donation FROM Donors ORDER BY Total_Donated_Amount DESC LIMIT 1",
            lowestDonor: "SELECT CONCAT(FName, ' ', LName) AS Name, Total_Donated_Amount AS Donation FROM Donors WHERE Total_Donated_Amount > 0 ORDER BY Total_Donated_Amount ASC LIMIT 1",
            topVolunteer: "SELECT CONCAT(Volunteers.FName, ' ', Volunteers.LName) AS Name, SUM(Volunteer_Participation.Hours_Worked) AS Hours FROM Volunteers INNER JOIN Volunteer_Participation ON Volunteers.VolunteerID = Volunteer_Participation.VolunteerID GROUP BY Volunteers.VolunteerID ORDER BY Hours DESC LIMIT 1",
            projectWithMostVolunteers: "SELECT Projects.Project_Name AS Project_Name, COUNT(Volunteer_Participation.VolunteerID) AS VolunteerCount FROM Projects INNER JOIN Volunteer_Participation ON Projects.ProjectID = Volunteer_Participation.ProjectID WHERE Projects.Status != 'Completed' GROUP BY Projects.ProjectID ORDER BY VolunteerCount DESC LIMIT 1"
        };

        const results = await Promise.all(Object.entries(queries).map(([key, query]) => new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0] || {});
                }
            });
        })));

        res.json({
            totalDonors: results[0].totalDonors,
            totalDonations: results[1].totalDonations || 0,
            totalProjects: results[2].totalProjects,
            totalVolunteers: results[3].totalVolunteers,
            maxDonation: results[4].maxDonation || 0,
            avgDonation: results[5].avgDonation || 0,
            totalVolunteerHours: results[6].totalVolunteerHours || 0,
            completedProjects: results[7].completedProjects || 0,
            highestDonor: results[8]?.Name ? results[8] : { Name: "No donors yet", Donation: 0 },
            lowestDonor: results[9]?.Name ? results[9] : { Name: "No donors yet", Donation: 0 },
            topVolunteer: results[10]?.Name ? results[10] : { Name: "No volunteers yet", Hours: 0 },
            projectWithMostVolunteers: results[11]?.Project_Name ? results[11] : { Project_Name: "No projects yet", VolunteerCount: 0 }
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
});

module.exports = router;
