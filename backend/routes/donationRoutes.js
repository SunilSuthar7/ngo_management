const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all donations
router.get('/', (req, res) => {
    db.query("SELECT * FROM Donations", (err, donations) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(donations);
    });
});

// Add a new donation
router.post('/add', (req, res) => {
    const { DonorID, ProjectID, Amount, PayMode, Donation_Date } = req.body;

    if (!DonorID || !ProjectID || !Amount || !PayMode || !Donation_Date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const checkProjectQuery = `
        SELECT p.ProjectID, p.Status 
        FROM Projects p 
        WHERE p.ProjectID = ? 
        AND p.Status = 'ongoing'
        FOR UPDATE`;
        
    db.query(checkProjectQuery, [ProjectID], (err, projects) => {
        if (err) {
            return res.status(500).json({ error: 'Database error while checking project' });
        }

        if (projects.length === 0) {
            return res.status(400).json({ error: 'Project not found or is not accepting donations' });
        }

        // Project exists and is ongoing, proceed with transaction
        db.beginTransaction((err) => {
            if (err) {
                console.error('Transaction Error: Failed to start transaction', err);
                return res.status(500).json({ error: 'Failed to start transaction' });
            }

            // Step 1: Insert the donation
            const insertDonationQuery = `
                INSERT INTO Donations (DonorID, ProjectID, Amount, PayMode, Donation_Date)
                VALUES (?, ?, ?, ?, ?);
            `;
            db.query(insertDonationQuery, [DonorID, ProjectID, Amount, PayMode, Donation_Date], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        console.error('Error inserting donation:', err);
                        res.status(500).json({ error: 'Failed to insert donation' });
                    });
                }

                // Step 2: Update the Donor's Total_Donated_Amount
                const updateDonorQuery = `
                    UPDATE Donors 
                    SET Total_Donated_Amount = Total_Donated_Amount + ? 
                    WHERE DonorID = ?;
                `;
                db.query(updateDonorQuery, [Amount, DonorID], (err, result) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error('Error updating donor:', err);
                            res.status(500).json({ error: 'Failed to update donor total amount' });
                        });
                    }

                    // Step 3: Update the Project's Budget_Raised
                    const updateProjectQuery = `
                        UPDATE Projects 
                        SET Budget_Raised = Budget_Raised + ? 
                        WHERE ProjectID = ?;
                    `;
                    db.query(updateProjectQuery, [Amount, ProjectID], (err, result) => {
                        if (err) {
                            return db.rollback(() => {
                                console.error('Error updating project:', err);
                                res.status(500).json({ error: 'Failed to update project budget raised' });
                            });
                        }

                        // Step 4: Update project status if conditions are met
                        const updateStatusQuery = `
                            UPDATE Projects 
                            SET Status = 'Completed'
                            WHERE ProjectID = ? 
                            AND Budget_Raised >= Budget_Required 
                            AND Status != 'Completed';
                        `;
                        db.query(updateStatusQuery, [ProjectID], (err, result) => {
                            if (err) {
                                return db.rollback(() => {
                                    console.error('Error updating project status:', err);
                                    res.status(500).json({ error: 'Failed to update project status' });
                                });
                            }

                            // Commit the transaction
                            db.commit((commitErr) => {
                                if (commitErr) {
                                    return db.rollback(() => {
                                        console.error('Transaction Error: Failed to commit transaction', commitErr);
                                        res.status(500).json({ error: 'Failed to commit transaction' });
                                    });
                                }

                                // Success response
                                res.status(201).json({ message: 'Donation recorded and updates applied successfully!' });
                            });
                        });
                    });
                });
            });
        });
    });
});

module.exports = router;