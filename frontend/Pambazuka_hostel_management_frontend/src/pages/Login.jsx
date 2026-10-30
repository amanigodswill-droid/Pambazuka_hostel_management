import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { toast } from "react-toastify";
import PasswordInput from "../components/PasswordInput";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        const { name, value } = e.target; setFormData({...formData, [name]: value});}
    async function handleSubmit(e) {e.preventDefault();

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/hostels/login/",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({username: formData.email, password: formData.password})
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Invalid email or password.");
                return;
            }

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("currentUser", JSON.stringify({
                id: data.user_id,
                username: data.username,
                email: data.username
            }));
            localStorage.setItem("isLoggedIn", "true");
            toast.success(`Welcome back, ${data.username}!`);

            setTimeout(() => {navigate("/booking");}, 1500);} 
            catch {
            toast.error("Unable to connect to the server.");
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-card">

                <h1>Welcome Back</h1>
                <p>Login to continue booking your hostel.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <PasswordInput
                            label="Password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="forgot-link"><Link to="/forgot-password">Forgot Password?</Link></div>
                    <button type="submit" className="primary-btn">Login</button>
                </form>

                <p>Don't have an account?{" "} <Link to="/register">Register here</Link></p>
            </div>
        </main>
    );
}

export default Login;