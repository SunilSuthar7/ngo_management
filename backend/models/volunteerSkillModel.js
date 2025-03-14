const db = require('../config/db');

const VolunteerSkill = {
    getAllByVolunteer: (volunteerID, callback) => {
        db.query("SELECT SkillSet FROM Volunteer_SkillSet WHERE VolunteerID = ?", [volunteerID], callback);
    },

    addSkills: (data, callback) => {
        if (!data.Skills || data.Skills.length === 0) {
            return callback(new Error("No skills provided"));
        }

        // Prepare multiple values for batch insertion
        const values = data.Skills.map(skill => [data.VolunteerID, skill]);

        db.query("INSERT INTO Volunteer_SkillSet (VolunteerID, SkillSet) VALUES ?", [values], callback);
    },

    removeSkill: (data, callback) => {
        db.query("DELETE FROM Volunteer_SkillSet WHERE VolunteerID = ? AND SkillSet = ?", 
            [data.VolunteerID, data.SkillSet], callback);
    }
};

module.exports = VolunteerSkill;
