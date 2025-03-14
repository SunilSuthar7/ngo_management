const Volunteer = require('../models/volunteerModel');
const VolunteerSkill = require('../models/volunteerSkillModel');
const db = require('../config/db'); // Import database connection

exports.getAllVolunteers = (req, res) => {
    Volunteer.getAll((err, volunteers) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(volunteers);
    });
};

exports.getVolunteerById = (req, res) => {
    Volunteer.getById(req.params.id, (err, volunteer) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(volunteer);
    });
};

// 🔥 Improved createVolunteer: Uses transactions for reliability
exports.createVolunteer = (req, res) => {
    const { FName, LName, Date_Joined, Contact_Number, Email, skills } = req.body;

    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ error: "Transaction failed to start" });

        // Step 1: Insert the volunteer
        Volunteer.create({ FName, LName, Date_Joined, Contact_Number, Email }, (err, result) => {
            if (err) {
                db.rollback(() => res.status(500).json({ error: err.message }));
                return;
            }

            const volunteerID = result.insertId; // Retrieve new VolunteerID

            if (!skills || skills.length === 0) {
                db.commit(() => res.json({ message: "Volunteer added successfully!", VolunteerID: volunteerID }));
                return;
            }

            // Step 2: Insert all skills
            const skillQueries = skills.map(skill => [volunteerID, skill]);
            db.query("INSERT INTO Volunteer_SkillSet (VolunteerID, SkillSet) VALUES ?", [skillQueries], (err) => {
                if (err) {
                    db.rollback(() => res.status(500).json({ error: "Failed to add skills", details: err.message }));
                    return;
                }

                db.commit(() => res.json({ message: "Volunteer and skills added successfully!", VolunteerID: volunteerID }));
            });
        });
    });
};

exports.updateVolunteer = (req, res) => {
    Volunteer.update(req.params.id, req.body, (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Volunteer updated successfully!" });
    });
};

exports.deleteVolunteer = (req, res) => {
    Volunteer.delete(req.params.id, (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Volunteer deleted successfully!" });
    });
};
