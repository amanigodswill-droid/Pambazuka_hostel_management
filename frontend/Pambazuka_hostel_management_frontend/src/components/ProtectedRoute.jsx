import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRoute({ children }) {
    const isLoggedIn=localStorage.getItem("isLoggedIn") === "true";
    const location = useLocation();
   if (!isLoggedIn) {
        toast.error("You must be logged in to access this page.");
         return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
}

export default ProtectedRoute;