import { useAppContext } from "@/contexts/AppContext";

export function useAuth() {
    const { setAddress, setIsConnected } = useAppContext();

    const handleConnect = async () => {};

    const handleDisconnect = async () => {};

    return {
        handleConnect,
        handleDisconnect,
    };
}
