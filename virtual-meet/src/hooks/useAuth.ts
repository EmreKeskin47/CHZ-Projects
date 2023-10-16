import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAppContext } from "@/contexts/AppContext";

export function useAuth() {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });
    const { disconnect } = useDisconnect();
    const { setAddress, setIsConnected } = useAppContext();

    const handleConnect = async () => {
        try {
            if (isConnected) {
                await handleDisconnect();
            }
            await connect();
            setAddress(address ?? "");
            setIsConnected(isConnected);
        } catch (error) {
            console.log("Error connecting: " + error);
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnect();
            setAddress(address ?? "");
            setIsConnected(isConnected);
        } catch (error) {
            console.log("Error connecting: " + error);
        }
    };

    return {
        address,
        isConnected,
        handleConnect,
        handleDisconnect,
    };
}
