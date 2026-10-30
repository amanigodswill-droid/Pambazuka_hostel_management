import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";
import Booking from "./pages/Booking";
import HostelDetails from "./pages/HostelDetails";
import Hostels from "./pages/Hostels";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/booking' element={<ProtectedRoute><Booking /></ProtectedRoute>} />
      <Route path='/hostels/:id' element={<HostelDetails />} />
      <Route path='/hostels' element={<Hostels />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/verify-otp' element={<VerifyOTP/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />
    </Routes>
    <Footer />
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false}
     newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
  );
}

export default App;
