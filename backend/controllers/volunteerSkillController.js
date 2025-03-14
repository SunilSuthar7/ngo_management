const VolunteerSkill = require('../models/volunteerSkillModel');

exports.getSkillsByVolunteer = (req, res) => {
    const { volunteerID } = req.params;
    VolunteerSkill.getAllByVolunteer(volunteerID, (err, skills) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(skills.length ? skills : []);  // Ensures an empty array is returned properly
    });
};

exports.addVolunteerSkills = (req, res) => {
    const { VolunteerID, Skills } = req.body;

    if (!Skills || !Array.isArray(Skills) || Skills.length === 0) {
        return res.status(400).json({ error: "Invalid or empty skills array" });
    }

    VolunteerSkill.addSkills({ VolunteerID, Skills }, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Skills added successfully!" });
    });
};

exports.removeVolunteerSkill = (req, res) => {
    VolunteerSkill.removeSkill(req.body, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Skill removed successfully!" });
    });
};
