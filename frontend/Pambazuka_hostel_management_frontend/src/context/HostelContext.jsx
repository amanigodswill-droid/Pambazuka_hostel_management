import { HostelContext } from "./HostelContext";
import hostels from "../data/hostels";

function HostelProvider({ children }) {
    return (
        <HostelContext.Provider value={{ hostels }}>
            {children}
        </HostelContext.Provider>
    );
}

export default HostelProvider;