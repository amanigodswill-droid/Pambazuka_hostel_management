import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import { toast } from 'react-toastify';
import PasswordInput from '../components/PasswordInput';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("hostelHubUsers")) || [];
        const user = users.find(user => user.email === formData.email && user.password === formData.password);

        if (!user) {
            toast.error("Invalid email or password.");
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");

        toast.success(`Welcome back, ${user.fullName}!`)


        setTimeout(() => {
            navigate("/booking");
        }, 1500);
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
                <button type="submit" className="primary-btn">
                    Login
                </button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    </main>
);
}

export default Login;