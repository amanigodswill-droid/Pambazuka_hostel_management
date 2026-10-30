import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../components/PasswordInput";
import "../styles/Auth.css";

function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const uid = searchParams.get("uid");
    const token = searchParams.get("token");
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    function handleChange(e) {
        const { name, value } = e.target;setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (!uid || !token) {
            toast.error("Invalid or missing password reset link.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/hostels/password-reset/confirm/",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({uid: uid, token: token, new_password: formData.password})
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(Array.isArray(data.error)? data.error.join(" "): data.error || "Password reset failed.");
            }

            toast.success("Password changed successfully.");
            setTimeout(() => {navigate("/login");}, 1500);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-card">
                <h1>Create New Password</h1>

                <form onSubmit={handleSubmit}>
                    <PasswordInput
                        label="New Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                    />

                    <PasswordInput
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                    />

                    <button className="auth-btn" disabled={loading}>{loading ? "Updating..." : "Update Password"}</button>
                </form>
            </div>
        </main>
    );
}

export default ResetPassword;
