const Donor = require('../models/donorModel');

exports.getAllDonors = (req, res) => {
    Donor.getAll((err, donors) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(donors);
    });
};

exports.getDonorById = (req, res) => {
    Donor.getById(req.params.id, (err, donor) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(donor);
    });
};

exports.createDonor = (req, res) => {
    Donor.create(req.body, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Donor added successfully!" });
    });
};

exports.updateDonor = (req, res) => {
    Donor.update(req.params.id, req.body, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Donor updated successfully!" });
    });
};

exports.deleteDonor = (req, res) => {
    Donor.delete(req.params.id, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Donor deleted successfully!" });
    });
};

// 🔥 New method: Increment Total_Donated_Amount
exports.incrementTotalDonatedAmount = (req, res) => {
    const { donorID, amount } = req.body;

    // Validate required fields
    if (!donorID || !amount) {
        return res.status(400).json({ error: 'DonorID and Amount are required' });
    }

    // Validate amount is a positive number
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    // Call the model method
    Donor.incrementTotalDonatedAmount(donorID, amount, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Total_Donated_Amount updated successfully!' });
    });
};