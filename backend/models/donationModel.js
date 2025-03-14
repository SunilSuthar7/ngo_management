const db = require('../config/db');

const Donation = {
    getAll: (callback) => {
        db.query("SELECT * FROM Donations", callback);
    },

    getById: (donationID, callback) => {
        db.query("SELECT * FROM Donations WHERE DonationID = ?", [donationID], callback);
    },

    // 🔥 Updated: Now updates Project Amt_Raised & Donor's Total_Donated_Amount
    create: (data, callback) => {
        db.beginTransaction(err => {
            if (err) return callback(err);

            // Step 1: Insert the donation
            db.query(
                "INSERT INTO Donations (DonorID, ProjectID, Amount, PayMode, Donation_Date) VALUES (?, ?, ?, ?, ?)",
                [data.DonorID, data.ProjectID, data.Amount, data.PayMode, data.Donation_Date],
                (donationErr, result) => {
                    if (donationErr) return db.rollback(() => callback(donationErr));

                    // Step 2: Update the Donor's Total_Donated_Amount
                    const updateDonorQuery = `
                        UPDATE Donors 
                        SET Total_Donated_Amount = Total_Donated_Amount + ? 
                        WHERE DonorID = ?;
                    `;
                    db.query(updateDonorQuery, [data.Amount, data.DonorID], (donorUpdateErr) => {
                        if (donorUpdateErr) return db.rollback(() => callback(donorUpdateErr));

                        // Step 3: Update the Project's Amt_Raised
                        const updateProjectQuery = `
                            UPDATE Projects 
                            SET Amt_Raised = Amt_Raised + ? 
                            WHERE ProjectID = ?;
                        `;
                        db.query(updateProjectQuery, [data.Amount, data.ProjectID], (projectUpdateErr) => {
                            if (projectUpdateErr) return db.rollback(() => callback(projectUpdateErr));

                            // Commit the transaction
                            db.commit(commitErr => {
                                if (commitErr) return db.rollback(() => callback(commitErr));

                                // Success response
                                callback(null, { message: "Donation recorded and updates applied successfully!" });
                            });
                        });
                    });
                }
            );
        });
    },

    update: (donationID, data, callback) => {
        db.query(
            "UPDATE Donations SET DonorID = ?, ProjectID = ?, Amount = ?, PayMode = ?, Donation_Date = ? WHERE DonationID = ?",
            [data.DonorID, data.ProjectID, data.Amount, data.PayMode, data.Donation_Date, donationID],
            callback
        );
    },

    delete: (donationID, callback) => {
        db.query("DELETE FROM Donations WHERE DonationID = ?", [donationID], callback);
    }
};

module.exports = Donation;