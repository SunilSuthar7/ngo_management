const db = require('../config/db');

const Project = {
    getAll: (callback) => {
        db.query("SELECT * FROM Projects", callback);
    },

    getById: (projectID, callback) => {
        db.query("SELECT * FROM Projects WHERE ProjectID = ?", [projectID], callback);
    },

    create: (data, callback) => {
        db.query(
            "INSERT INTO Projects (Project_Name, Description, Start_Date, End_Date, Status, Amt_Required, Amt_Raised) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [data.Project_Name, data.Description, data.Start_Date, data.End_Date, data.Status, data.Amt_Required, data.Amt_Raised],
            callback
        );
    },

    update: (projectID, data, callback) => {
        db.query(
            "UPDATE Projects SET Project_Name = ?, Description = ?, Start_Date = ?, End_Date = ?, Status = ?, Amt_Required = ?, Amt_Raised = ? WHERE ProjectID = ?",
            [data.Project_Name, data.Description, data.Start_Date, data.End_Date, data.Status, data.Amt_Required, data.Amt_Raised, projectID],
            callback
        );
    },

    // 🔥 Updated: Only updates Amt_Raised (if you want to update Amt_Required, add it back)
    updateAmountRaised: (projectID, newAmtRaised, callback) => {
        // Validate newAmtRaised
        if (isNaN(newAmtRaised)) {
            return callback(new Error("Invalid amount: Amt_Raised must be a number"));
        }

        db.query(
            "UPDATE Projects SET Budget_Raised = ? WHERE ProjectID = ?",
            [newAmtRaised, projectID],
            callback
        );
    },

    delete: (projectID, callback) => {
        db.query("DELETE FROM Projects WHERE ProjectID = ?", [projectID], callback);
    }
};

module.exports = Project;