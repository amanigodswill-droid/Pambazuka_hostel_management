import { useState } from "react";
import { toast } from "react-toastify";
import "../styles/Auth.css";
import API_BASE_URL from "../api";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {e.preventDefault();setLoading(true);

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/hostels/password-reset/`,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ email })
                }
            );

            const data = await response.json();

            if (!response.ok) {throw new Error(data.error || "Password reset request failed.");}
            toast.success(data.message);
            setEmail("");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-card">
                <h1>Forgot Password</h1>
                <p>Enter your email address to receive a password reset link.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <button className="auth-btn" disabled={loading}> {loading ? "Sending..." : "Send Reset Link"}</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default ForgotPassword;
