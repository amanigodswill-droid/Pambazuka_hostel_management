import { createContext } from "react";
import hostels from "../data/hostels";

export const HostelContext = createContext();
function HostelProvider({ children}) {
    return (
        <HostelContext.Provider value={{hostels}}>{children}</HostelContext.Provider>
    );
}

export default HostelProvider;