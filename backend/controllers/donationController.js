const Donation = require('../models/donationModel');
const Donor = require('../models/donorModel');
const Project = require('../models/projectModel');
const db = require('../config/db'); // Import the database connection for transactions

exports.createDonation = async (req, res) => {
    const { DonorID, ProjectID, Amount, PayMode, Donation_Date } = req.body;

    // Log the request body
    console.log('Request Body:', req.body);

    // Validate required fields
    if (!DonorID || !ProjectID || !Amount || !PayMode || !Donation_Date) {
        console.error('Validation Error: Missing required fields');
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate Amount is a positive number
    if (isNaN(Amount) || Amount <= 0) {
        console.error('Validation Error: Amount must be a positive number');
        return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    try {
        // Check if the project is ongoing
        const checkProjectStatusQuery = `SELECT Status FROM Projects WHERE ProjectID = ?;`;
        const [project] = await db.promise().query(checkProjectStatusQuery, [ProjectID]);

        if (project.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (project[0].Status === 'Completed') {
            return res.status(400).json({ error: 'Cannot donate to this project as it is already completed.' });
        }

        // Start a transaction
        db.beginTransaction(async (err) => {
            if (err) {
                console.error('Transaction Error: Failed to start transaction', err);
                return res.status(500).json({ error: 'Failed to start transaction' });
            }

            try {
                // Step 1: Insert the donation
                const donationQuery = `
                    INSERT INTO Donations (DonorID, ProjectID, Amount, PayMode, Donation_Date)
                    VALUES (?, ?, ?, ?, ?);
                `;
                console.log('Inserting donation into Donations table...');
                await db.promise().query(donationQuery, [DonorID, ProjectID, Amount, PayMode, Donation_Date]);
                console.log('Donation inserted successfully!');

                // Step 2: Update the Donor's Total_Donated_Amount
                const updateDonorQuery = `
                    UPDATE Donors 
                    SET Total_Donated_Amount = Total_Donated_Amount + ? 
                    WHERE DonorID = ?;
                `;
                console.log('Updating Donor\'s Total_Donated_Amount...');
                await db.promise().query(updateDonorQuery, [Amount, DonorID]);
                console.log('Donor\'s Total_Donated_Amount updated successfully!');

                // Step 3: Update the Project's Amt_Raised
                const updateProjectQuery = `
                    UPDATE Projects 
                    SET Budget_Raised = Budget_Raised + ? 
                    WHERE ProjectID = ?;
                `;
                console.log('Updating Project\'s Amt_Raised...');
                await db.promise().query(updateProjectQuery, [Amount, ProjectID]);
                console.log('Project\'s Amt_Raised updated successfully!');

                // Commit the transaction
                db.commit((commitErr) => {
                    if (commitErr) {
                        console.error('Transaction Error: Failed to commit transaction', commitErr);
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Failed to commit transaction' });
                        });
                    }

                    console.log('Transaction committed successfully!');
                    res.status(201).json({ message: 'Donation recorded and updates applied successfully!' });
                });
            } catch (error) {
                // Rollback the transaction in case of error
                console.error('Error during donation processing:', error);
                db.rollback(() => {
                    res.status(500).json({ error: error.message });
                });
            }
        });
    } catch (error) {
        console.error('Error checking project status:', error);
        res.status(500).json({ error: 'Failed to check project status' });
    }
};