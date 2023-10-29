import { FC, ReactNode, createContext, useContext, useState } from "react";

type AppContextType = {
    address: string;
    isConnected: boolean;
    setAddress: (newAddress: string) => void;
    setIsConnected: (newIsConnected: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error(
            "useAppContext must be used within an AppContextProvider"
        );
    }
    return context;
};

export const AppContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [address, setAddress] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const contextValue = {
        address,
        isConnected,
        setAddress,
        setIsConnected,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
