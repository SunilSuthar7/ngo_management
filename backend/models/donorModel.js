const db = require('../config/db');

const Donor = {
    getAll: (callback) => {
        db.query("SELECT * FROM Donors", callback);
    },

    getById: (donorID, callback) => {
        db.query("SELECT * FROM Donors WHERE DonorID = ?", [donorID], callback);
    },

    create: (data, callback) => {
        // Validate required fields
        if (!data.FName || !data.Address || !data.Contact_Number || !data.Email) {
            return callback(new Error("Missing required fields: FName, Address, Contact_Number, Email"));
        }

        // Set default value for Total_Donated_Amount if not provided
        const totalDonatedAmount = data.Total_Donated_Amount || 0;

        db.query(
            "INSERT INTO Donors (FName, LName, Address, Contact_Number, Email, Total_Donated_Amount) VALUES (?, ?, ?, ?, ?, ?)",
            [data.FName, data.LName, data.Address, data.Contact_Number, data.Email, totalDonatedAmount],
            callback
        );
    },

    update: (donorID, data, callback) => {
        // Validate required fields
        if (!data.FName || !data.Address || !data.Contact_Number || !data.Email) {
            return callback(new Error("Missing required fields: FName, Address, Contact_Number, Email"));
        }

        db.query(
            "UPDATE Donors SET FName = ?, LName = ?, Address = ?, Contact_Number = ?, Email = ?, Total_Donated_Amount = ? WHERE DonorID = ?",
            [data.FName, data.LName, data.Address, data.Contact_Number, data.Email, data.Total_Donated_Amount, donorID],
            callback
        );
    },

    // 🔥 New method: Increment Total_Donated_Amount when a donation is made
    incrementTotalDonatedAmount: (donorID, amount, callback) => {
        // Validate amount
        if (isNaN(amount)) {
            return callback(new Error("Invalid amount: Amount must be a number"));
        }

        db.query(
            "UPDATE Donors SET Total_Donated_Amount = Total_Donated_Amount + ? WHERE DonorID = ?",
            [amount, donorID],
            callback
        );
    },

    delete: (donorID, callback) => {
        db.query("DELETE FROM Donors WHERE DonorID = ?", [donorID], callback);
    }
};

module.exports = Donor;