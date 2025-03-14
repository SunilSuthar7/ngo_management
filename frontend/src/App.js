import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ViewDetails from "./components/ViewDetails";
import Register from "./components/Register";

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
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    {/* Home */}
                    <Route path="/" element={<Home />} />

                    {/* View Details Section */}
                    <Route path="/view-details" element={<ViewDetails />} />
                    <Route path="/donor-list" element={<DonorList />} />
                    <Route path="/volunteer-list" element={<VolunteerList />} />
                    <Route path="/project-list" element={<ProjectList />} />
                    <Route path="/donation-list" element={<DonationList />} />
                    <Route path="/volunteer-participation-list" element={<VolunteerParticipationList />} />

                    {/* Registration Section */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/register/donor" element={<AddDonor />} />
                    <Route path="/register/volunteer" element={<AddVolunteer />} />
                    <Route path="/register/project" element={<AddProject />} />
                    <Route path="/register/donation" element={<AddDonation />} />
                    <Route path="/register/participation" element={<AddVolunteerParticipation />} />

                    {/* 404 Page Not Found */}
                    <Route path="*" element={<h2>Page Not Found</h2>} />
                </Routes>
            </div>
        </>
    );
}

export default App;
