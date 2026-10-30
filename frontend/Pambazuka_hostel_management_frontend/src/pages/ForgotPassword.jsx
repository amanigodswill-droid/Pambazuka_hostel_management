import {useState} from "react";
import { useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "../styles/Auth.css";

function ForgotPassword() {
    const [email,setEmail] =useState("")
    const navigate = useNavigate();

    function handleSubmit(e) {e.preventDefault();

        const users =JSON.parse(localStorage.getItem("hostelHubUsers"))|| [];
        const user =users.find((user) =>user.email ===email);

        if (!user) {
            toast.error("No account found with this email.");
            return;
        }

        const otp =Math. floor(100000 + Math.random()* 900000). toString();
        localStorage.setItem("generatedOTP",otp);
        localStorage.setItem("otpEmail",email);

        toast.success(`Demo OTP:${otp}`);

        navigate("/verify-otp");
    }

    return (
        <main className="auth-page">
            <div className="auth-card">
                <h1>Forgot Password</h1>
                <p>Enter your email address nto receive a verification code.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" value={email} onChange={(e) =>setEmail(e.target.value)}required/>
                        <button className="auth-btn">Send OTP</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default ForgotPassword;