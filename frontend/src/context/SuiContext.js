import { createContext, useState } from "react";

export const SuiContext = createContext();

export const SuiProvider = ({ children}) => {
    const [wallet, setWallet] = useState(null);
    const [contractId, setContractId] = useState(null);

    return (
        <SuiContext.Provider value={{wallet, setWallet, contractId,setContractId}}>
            {children}
        </SuiContext.Provider>
    );
};