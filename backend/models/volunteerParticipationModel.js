const db = require('../config/db');

const VolunteerParticipation = {
    getAll: (callback) => {
        db.query("SELECT * FROM Volunteer_Participation", callback);
    },
    getById: (participationID, callback) => {
        db.query("SELECT * FROM Volunteer_Participation WHERE ParticipationID = ?", [participationID], callback);
    },
    create: (data, callback) => {
        db.query("INSERT INTO Volunteer_Participation (VolunteerID, ProjectID, Hours_Worked, Role, Date_Joined) VALUES (?, ?, ?, ?, ?)",
            [data.VolunteerID, data.ProjectID, data.Hours_Worked, data.Role, data.Date_Joined], callback);
    },
    update: (participationID, data, callback) => {
        db.query("UPDATE Volunteer_Participation SET VolunteerID = ?, ProjectID = ?, Hours_Worked = ?, Role = ?, Date_Joined = ? WHERE ParticipationID = ?",
            [data.VolunteerID, data.ProjectID, data.Hours_Worked, data.Role, data.Date_Joined, participationID], callback);
    },
    delete: (participationID, callback) => {
        db.query("DELETE FROM Volunteer_Participation WHERE ParticipationID = ?", [participationID], callback);
    }
};

module.exports = VolunteerParticipation;
