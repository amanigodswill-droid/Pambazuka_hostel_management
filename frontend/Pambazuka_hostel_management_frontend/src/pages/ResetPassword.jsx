import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../components/PasswordInput";
import"../styles/Auth.css";

function ResetPassword() {
    const navigate=useNavigate();
    const [formData, setFormData]=
    useState({
        password:"",
        confirmPassword:"",
    });

    function handleChange(e) {
        const { name,value }=e.target;
        setFormData({...formData,[name]:value,});
    }

    function handleSubmit(e) {e.preventDefault();

        if(formData.password !==formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        const email =localStorage.getItem("otpEmail");
        const users =JSON.parse(localStorage.getItem("hostelHubUsers")) || [];
        const updatedUsers =users.map((user) =>
        {
            if (user.email ===email) {
                return {...user,password:formData.password,};
            }
            return user;
        });

        localStorage.setItem("hostelHubUsers",JSON.stringify(updatedUsers));
        localStorage.removeItem("generatedOTP");
        localStorage.removeItem("otpEmail");

        toast.success("Password changed successfully.");

        setTimeout(() =>{navigate("/login");},1500);
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
                    placeholder="Enter new password"/>

                    <PasswordInput
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"/>

                    <button className="auth-btn">Update Password</button>
                    </form>
                </div>
            </main>
  );
}

export default ResetPassword;
