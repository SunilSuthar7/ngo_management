import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = credentials;

        // Check if user is admin
        if (username === "admin" && password === "admin123") {
            login({ username, role: "admin" });
            navigate("/");
        } else {
            // Retrieve users from localStorage
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find((u) => u.username === username && u.password === password);

            if (user) {
                login({ username, role: "user" });
                navigate("/");
            } else {
                alert("Invalid credentials");
            }
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                <p>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
