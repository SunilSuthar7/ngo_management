const VolunteerParticipation = require('../models/volunteerParticipationModel');

exports.getAllVolunteerParticipation = (req, res) => {
    VolunteerParticipation.getAll((err, records) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(records);
    });
};

exports.getVolunteerParticipationById = (req, res) => {
    VolunteerParticipation.getById(req.params.id, (err, record) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(record);
    });
};

exports.createVolunteerParticipation = (req, res) => {
    VolunteerParticipation.create(req.body, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Volunteer participation recorded successfully!" });
    });
};

exports.updateVolunteerParticipation = (req, res) => {
    VolunteerParticipation.update(req.params.id, req.body, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Volunteer participation updated successfully!" });
    });
};

exports.deleteVolunteerParticipation = (req, res) => {
    VolunteerParticipation.delete(req.params.id, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Volunteer participation record deleted successfully!" });
    });
};
