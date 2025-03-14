const db = require('../config/db');

const Volunteer = {
    getAll: (callback) => {
        db.query("SELECT * FROM Volunteers", callback);
    },

    getById: (volunteerID, callback) => {
        db.query("SELECT * FROM Volunteers WHERE VolunteerID = ?", [volunteerID], callback);
    },

    create: (data, callback) => {
        db.beginTransaction((err) => {
            if (err) return callback(err);

            // Insert volunteer
            db.query(
                "INSERT INTO Volunteers (FName, LName, Date_Joined, Contact_Number, Email) VALUES (?, ?, ?, ?, ?)",
                [data.FName, data.LName, data.Date_Joined, data.Contact_Number, data.Email],
                (err, result) => {
                    if (err) return db.rollback(() => callback(err));

                    const volunteerID = result.insertId; // Get the new volunteer's ID

                    // Insert skills if any exist
                    if (data.skills && data.skills.length > 0) {
                        const skillValues = data.skills.map(skill => [volunteerID, skill]);

                        db.query(
                            "INSERT INTO Volunteer_SkillSet (VolunteerID, SkillSet) VALUES ?",
                            [skillValues],
                            (err) => {
                                if (err) return db.rollback(() => callback(err));

                                db.commit((err) => {
                                    if (err) return db.rollback(() => callback(err));
                                    callback(null, { message: "Volunteer and skills added successfully!" });
                                });
                            }
                        );
                    } else {
                        db.commit((err) => {
                            if (err) return db.rollback(() => callback(err));
                            callback(null, { message: "Volunteer added successfully!" });
                        });
                    }
                }
            );
        });
    },

    update: (volunteerID, data, callback) => {
        db.query(
            "UPDATE Volunteers SET FName = ?, LName = ?, Date_Joined = ?, Contact_Number = ?, Email = ? WHERE VolunteerID = ?",
            [data.FName, data.LName, data.Date_Joined, data.Contact_Number, data.Email, volunteerID],
            callback
        );
    },

    delete: (volunteerID, callback) => {
        db.query("DELETE FROM Volunteers WHERE VolunteerID = ?", [volunteerID], callback);
    }
};

module.exports = Volunteer;
