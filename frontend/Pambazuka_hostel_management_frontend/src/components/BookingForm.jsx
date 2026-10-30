import { useState } from "react";
import "../styles/Booking.css";
import {toast} from "react-toastify";

function BookingForm({selectedHostel,onBookingComplete }) {
    const [formData, setFormData] =
    useState({
        fullName:"",
        email:"",
        phone:"",
        nationalId:"",
        gender:"",
        university:"",
        registrationNumber:"",

        hostel:selectedHostel ?selectedHostel.name:"",
        roomType:"",
        moveInDate:"",
        specialRequests:"",

        paymentMethod:"",
        mpesaPhone:"",
        mpesaCode:"",
        bankReference:"",
        });

function handleChange(e) {
    const {name,value} = e.target;

    setFormData({...formData,[name]:value,});
}

    function handleSubmit(e) {e.preventDefault();

        if (!selectedHostel) {
            toast.error("Please select a hostel before booking.");
            return;
        }
        if (formData.paymentMethod === "M-Pesa" && (!formData.mpesaPhone || !formData.mpesaCode)) {
            toast.error("Please provide M-Pesa phone number and transaction code.");
            return;
        }
        if (formData.paymentMethod === "Bank" && !formData.bankReference) {
            toast.error("Please provide bank transaction reference.");
            return;
        }
        if (!formData.fullName || !formData.email || !formData.phone || !formData.nationalId || !formData.gender || !formData.university || !formData.registrationNumber || !formData.roomType || !formData.moveInDate || !formData.paymentMethod) {
            toast.error("Please fill in all required fields.");
            return;
        }
        if (!formData.email.includes("@")) {
            toast.error("Please enter a valid email address.");
            return;
        }
        if (formData.phone.length < 10) {
            toast.error("Please enter a valid phone number.");
            return;
        }
        if (formData.nationalId.length < 6) {
            toast.error("Please enter a valid National ID or Passport number.");
            return;
        }
        if (formData.registrationNumber.length < 5) {
            toast.error("Please enter a valid registration number.");
            return;
        }
        if (formData.moveInDate < new Date().toISOString().split("T")[0]) {
            toast.error("Move-in date cannot be in the past.");
            return;
        }
        if (formData.paymentMethod === "M-Pesa" && !/^\d{10}$/.test(formData.mpesaPhone)) {
            toast.error("Please enter a valid 10-digit M-Pesa phone number.");
            return;
        }
        if (formData.paymentMethod === "M-Pesa" && !/^[A-Z0-9]{6,10}$/.test(formData.mpesaCode)) {
            toast.error("Please enter a valid M-Pesa transaction code (6-10 alphanumeric characters).");
            return;
        }
        const receiptNumber="HH-" + Date.now();
        const bookingDetails={...formData,receiptNumber,bookingDate:new Date()
            .toLocaleDateString(),amountPaid:selectedHostel ?
            selectedHostel.price:0,
        };
        const existingBookings= JSON.parse(localStorage.getItem("hostelBookings"))||[];
        existingBookings.push(bookingDetails);
        localStorage.setItem("hostelBookings", JSON.stringify(existingBookings));
        toast.success("Booking confirmed! A receipt has been generated.");
       toast.info(`Receipt number: ${receiptNumber}`);
       onBookingComplete(bookingDetails);

    }

return (
    <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Student Information</h2>
        <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName}
            onChange={handleChange} placeholder="Enter your full name" required/>
        </div>
         <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email}
            onChange={handleChange} placeholder="example@email.com" required/>
        </div>
         <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone}
            onChange={handleChange} placeholder="07XXXXXXXX" required/>
        </div>
         <div className="form-group">
            <label>National ID/Passport</label>
            <input type="text" name="nationalId" value={formData.nationalId}
            onChange={handleChange} placeholder="Enter your ID or passport Number"
             required/>
        </div>
        <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}  required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            </select>
        </div>
        <div className="form-group">
            <label>University</label>
            <input type="text" name="university" value={formData.university}
            onChange={handleChange} placeholder="e.g Moi University"
             required/>
        </div>
        <div className="form-group">
            <label>Registration Number</label>
            <input type="text" name="registrationNumber" value={formData.registrationNumber}
            onChange={handleChange} placeholder="e.g. SIT/1234/26"
             required/>
        </div>
        <hr/>
        <h2>Booking Details</h2>
        <div className="form-group">
            <label>Selected Hostel</label>
             <input type="text" name="hostel" value={formData.hostel}
             readOnly/>
        </div>
         {selectedHostel &&(

            <div className="selected-hostel">
                <h3>Selected Hostel</h3>
                <p><strong>Monthly Rent:</strong>Ksh{selectedHostel.price}</p>
                <p><strong>Location:</strong>{selectedHostel.location}</p>
                <p><strong>Distance:</strong>{selectedHostel.distance}</p>
                <p><strong>Available Rooms:</strong>{selectedHostel.availability}</p>
            </div>
         )}
        <div className="form-group">
            <label>Room Type</label>
            <select name="roomType" value={formData.roomType} onChange={handleChange}  required>
            <option value="">Select Room Type</option>
            <option>Single</option>
            <option>Shared</option>
            </select>
        </div>
        <div className="form-group">
            <label>Move-in Date</label>
            <input type="date" name="moveInDate" value={formData.moveInDate}
            onChange={handleChange} required/>
        </div>
        <div className="form-group">
            <label>Special Requests(Optional)</label>
            <textarea name="specialRequests" value={formData.specialRequests}
            onChange={handleChange} placeholder="Any additional information..."
            rows="4"/>
        </div>
        <hr/>
        <h2>Payment Details</h2>
        <div className="form-group">
            <label>Payment Method</label>
            <select name="paymentMethod" value={formData.paymentMethod}
            onChange={handleChange} placeholder="e.g. SIT/1234/26"
             required>
            <option value="">Select Payment Method</option>
            <option value="M-Pesa">M-Pesa</option>
            <option value="Bank">Bank</option>
             </select>
        </div>
        {formData.paymentMethod ==="M-Pesa" &&(
            <>
            <div className="form-group">
            <label>M-Pesa Phone Number</label>
            <input type="tel" name="mpesaPhone" value={formData.mpesaPhone}
            onChange={handleChange} placeholder="07XXXXXXXX"
             required/>
        </div>
        <div className="form-group">
            <label>M-Pesa Transaction Code</label>
            <input type="text" name="mpesaCode" value={formData.mpesaCode}
            onChange={handleChange} placeholder="e.g QWE123ABC"
             required/>
        </div>
            </>
        )}
         {formData.paymentMethod ==="Bank" &&(
            <>
            <div className="bank-details">
                <h3>HostelHub Bank Details</h3>
                <p><strong>Bank:</strong>Equity Bank</p>
                <p><strong>Account Name:</strong>HostelHub Limited</p>
                <p><strong>Account Number:</strong>3425637890</p>
                <p><strong>Branch:</strong>Eldoret</p>
            </div>
            <div className="form-group">
            <label>Bank Transcation Reference</label>
            <input type="text" name="bankReference" value={formData.bankReference}
            onChange={handleChange} placeholder="Enter transaction reference"
             required/>
        </div>

            </>
        )}
        <div className="form-group checkbox-group">
            <label><input type="checkbox" required/>{""}I confirm that the information above is correct
            and I agree to HostelHub's booking terms.</label>
        </div>
       <button type="submit" className="confirm-btn">Confirm Booking</button>


    </form>
);
}

export default BookingForm;