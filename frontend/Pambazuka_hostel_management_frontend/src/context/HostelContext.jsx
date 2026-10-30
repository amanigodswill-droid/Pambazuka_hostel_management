import { useEffect, useState } from "react";
import { HostelContext } from "./HostelContext";

function HostelProvider({ children }) {
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/hostels/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch hostels.");
                }
                return response.json();
            })
            .then((data) => {setHostels(data); setLoading(false);})
            .catch((error) => {setError(error.message); setLoading(false);});
    }, []);

    return (
        <HostelContext.Provider value={{ hostels, loading, error }}>
            {children}
        </HostelContext.Provider>
    );
}

export default HostelProvider;
