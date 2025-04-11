import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ViewDetails from "./components/ViewDetails";
import Register from "./components/Register";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NotAuthorized from "./components/NotAuthorized"; // New component
import { AuthProvider, RequireAuth, RequireAdmin } from "./auth/AuthContext";

// Entities
import AddDonor from "./components/AddDonor";
import DonorList from "./components/DonorList";
import AddVolunteer from "./components/AddVolunteer";
import VolunteerList from "./components/VolunteerList";
import AddProject from "./components/AddProject";
import ProjectList from "./components/ProjectList";
import AddDonation from "./components/AddDonation";
import DonationList from "./components/DonationList";
import AddVolunteerParticipation from "./components/AddVolunteerParticipation";
import VolunteerParticipationList from "./components/VolunteerParticipationList";

import "./styles/global.css";

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <div className="container">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/view-details" element={<ViewDetails />} />
                    <Route path="/donor-list" element={<DonorList />} />
                    <Route path="/volunteer-list" element={<VolunteerList />} />
                    <Route path="/project-list" element={<ProjectList />} />
                    <Route path="/donation-list" element={<DonationList />} />
                    <Route path="/volunteer-participation-list" element={<VolunteerParticipationList />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Protected Routes for Users */}
                    <Route path="/register/donor" element={<RequireAuth><AddDonor /></RequireAuth>} />
                    <Route path="/register/volunteer" element={<RequireAuth><AddVolunteer /></RequireAuth>} />

                    {/* Admin-Only Routes */}
                    <Route path="/register/project" element={<RequireAdmin><AddProject /></RequireAdmin>} />
                    <Route path="/register/donation" element={<RequireAdmin><AddDonation /></RequireAdmin>} />
                    <Route path="/register/participation" element={<RequireAdmin><AddVolunteerParticipation /></RequireAdmin>} />

                    {/* Not Authorized Route */}
                    <Route path="/not-authorized" element={<NotAuthorized />} />

                    {/* 404 Page Not Found */}
                    <Route path="*" element={<h2>Page Not Found</h2>} />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
