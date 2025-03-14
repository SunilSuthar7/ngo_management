const Project = require('../models/projectModel');

exports.getAllProjects = (req, res) => {
    Project.getAll((err, projects) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(projects);
    });
};

exports.getProjectById = (req, res) => {
    Project.getById(req.params.id, (err, project) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(project);
    });
};

exports.createProject = (req, res) => {
    Project.create(req.body, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Project added successfully!" });
    });
};

exports.updateProject = (req, res) => {
    Project.update(req.params.id, req.body, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Project updated successfully!" });
    });
};

exports.deleteProject = (req, res) => {
    Project.delete(req.params.id, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Project deleted successfully!" });
    });
};
