import { useEffect, useState } from "react";
import { HostelContext } from "./HostelContext";
import API_BASE_URL from "../api";
import sampleHostels from "../data/hostels";

function HostelProvider({ children }) {
    const [hostels, setHostels] = useState(sampleHostels);
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
                setHostels(data.length > 0 ? data : sampleHostels);
                setLoading(false);
            })
            .catch(() => {
                setHostels(sampleHostels);
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
