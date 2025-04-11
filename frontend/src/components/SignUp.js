import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { username: formData.username, password: formData.password };

        // Retrieve existing users from localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(newUser);

        // Save updated users back to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        alert("User registered successfully!");
        navigate("/login");
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
