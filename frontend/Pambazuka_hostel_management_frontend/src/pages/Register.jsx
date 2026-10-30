import {useState} from "react";
import PasswordInput from "../components/PasswordInput";
import {useNavigate, Link} from "react-router-dom";
import {toast} from "react-toastify";
import "../styles/Auth.css";

function Register() {
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        fullName:"",
        email:"",
        phone:"",
        password:"",
        confirmPassword:""
    });
    function handleChange(e) {setFormData({...formData,[e.target.name]:e.target.value,});
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
            toast.error("Please fill in all required fields.");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        const users=JSON.parse(localStorage.getItem("hostelHubUsers")) || [];
        const existingUser=users.find(user=>user.email===formData.email);
        if (existingUser) {
            toast.error("An account with this email already exists.");
            return;
        }
        users.push({fullName:formData.fullName,email:formData.email,phone:formData.phone,password:formData.password});
        localStorage.setItem("hostelHubUsers",JSON.stringify(users)
        );

        toast.success("Account created successfully!");
        setTimeout(()=>{
            navigate("/login");
        },1500);
    }

    return (
        <main className="register-page">
            <form className="register-form" onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <label>Full Name</label>
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                <label>Email</label>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <label>Phone Number</label>
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                <PasswordInput label="Password" name="password" placeholder="password" value={formData.password} onChange={handleChange} required />
                <PasswordInput label="Confirm Password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                <button type="submit" className="register-btn">Create Account</button>
                <p className="auth-link">Already have an account?{""} <Link to="/login">Login</Link></p>
            </form>
        </main>
    );

}

export default Register;