import { useState } from "react";
import "../styles/Contacts.css";

function Contact() {
  const [ formData,setFormData] =useState({
    name:"",
    email:"",
    subject:"",
    message:"",
  });
  function handleChange(e) {
    const {name,value} = e.target;setFormData({...formData,[name]:value,});
  }
  function handleSubmit(e) {e.preventDefault();
    alert("Thank you for contacting HostelHub. We will get back to you very soon");
    setFormData({
     name:"",
     email:"",
     subject:"",
     message:""
    });
  }
  return (
    <main className="contact-page">
      <section className="contact-header">
      <h1>Contact HostelHub Ltd</h1>
      <p><strong>We'd love to hear from you!</strong> Whether you need help finding a hostel orhave
        questions about our services, our support team is here to assist you.
      </p>
      </section>
      <section className="contact-content">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>You can contact HostelHub Eldoret using the information below.</p>

        <div className="contact-detail">
          <h3>Location</h3>
          <p>Eldoret,Kenya</p>
        </div>
        <div className="contact-detail">
          <h3>Email</h3>
          <p>hostelhub@gmail.com</p>
        </div>
        <div className="contact-detail">
          <h3>Working Hours</h3>
          <p>Monday-Friday:8:00AM - 5:00AM</p>
        </div>
        </div>
        <div className="contact-form-container">
        <h2>Send Us a Message</h2>
         <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name}
            onChange={handleChange} placeholder="Enter your name" required/>
        </div>
         <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email}
            onChange={handleChange} placeholder="Enter your email" required/>
        </div>
         <div className="form-group">
            <label>Subject</label>
            <input type="text" name="subject" value={formData.subject}
            onChange={handleChange} placeholder="Enter you subject" required/>
        </div>
         <div className="form-group">
            <label>Message</label>
            <textarea name="message" value={formData.message}
            onChange={handleChange} placeholder="Write your message..." rows="5"
             required/>
        </div>
        <button type="submit" className="contact-btn">Send Message</button>
        </form>
          </div>

      </section>
    </main>
  );
}

export default Contact;