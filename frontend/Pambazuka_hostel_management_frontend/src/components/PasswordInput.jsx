import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput({ label, name, value, onChange, placeholder, required }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="form-group">
            <label>{label}</label>

            <div className="password-wrapper">
                <input type={showPassword ? "text" : "password"} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}/>
                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
        </div>
    );
}

export default PasswordInput;
