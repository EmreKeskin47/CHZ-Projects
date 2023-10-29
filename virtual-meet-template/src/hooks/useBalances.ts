import { NativeBalance } from "./../types/NativeBalance";
import { useCallback, useEffect, useState } from "react";
import Moralis from "moralis";
import { TokenBalance } from "@/types/TokenBalance";
import { useAppContext } from "@/contexts/AppContext";
import { apiKey } from "@/util/addresses";
import { current_chain } from "@/util/chain";

export function useBalances() {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
    const [nativeBalance, setNativeBalance] = useState<NativeBalance>();
    const { address } = useAppContext();

    const fetchTokenBalance = useCallback(async () => {}, []);

    useEffect(() => {
        fetchTokenBalance();
    }, [fetchTokenBalance]);

    return {
        loading,
        message,
        tokenBalances,
        nativeBalance,
    };
}
