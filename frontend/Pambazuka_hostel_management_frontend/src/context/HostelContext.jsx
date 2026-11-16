import { useEffect, useState } from "react";
import { HostelContext } from "./HostelContext";
import API_BASE_URL from "../api";

function HostelProvider({ children }) {
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/hostels/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch hostels.");
                }
                return response.json();
            })
            .then((data) => {
                setHostels(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching hostels:", error);
                setHostels([]);
                setLoading(false);
            });
    }, []);

    return (
        <HostelContext.Provider value={{ hostels, loading, error: "" }}>
            {children}
        </HostelContext.Provider>
    );
}

export default HostelProvider;
