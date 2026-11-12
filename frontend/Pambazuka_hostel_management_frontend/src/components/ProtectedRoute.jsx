import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRoute({ children, ownerOnly = false }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const location = useLocation();

    const savedUser = localStorage.getItem("currentUser");
    const currentUser = savedUser && savedUser !== "undefined"
        ? JSON.parse(savedUser)
        : null;

    if (!isLoggedIn || !localStorage.getItem("authToken")) {
        toast.error("You must be logged in to access this page.");

        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    if (ownerOnly && currentUser?.is_owner !== true) {
        toast.error("Only hostel owners can access this page.");
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
