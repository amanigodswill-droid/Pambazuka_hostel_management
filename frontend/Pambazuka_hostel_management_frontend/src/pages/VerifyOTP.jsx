import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import {toast} from "react-toastify";
import "../styles/Auth.css";

function VerifyOTP() {

    const [otp,setOtp] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {e.preventDefault();
        const savedOTP =localStorage.getItem("generatedOTP");

        if (otp !== savedOTP){
            toast.error("Incorrect OTP.");

            return;
        }
        toast.success("OTP verified.");
        navigate("/reset-password");
    }

   return (
    <main className="auth-page">
        <div className="auth-card">
            <h1>Verify OTP</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Enter OTP</label>
                <input type="text" value={otp} onChange={(e) =>setOtp(e.target.value)} required/>
        </div>
        <button className="auth-btn">Verify OTP</button>
        </form>
        </div>
    </main>
   );
}

export default VerifyOTP;