import { useCallback, useEffect, useState } from "react";
import Moralis from "moralis";
import { EvmChain } from "moralis/common-evm-utils";
import { TokenBalance } from "@/types/TokenBalance";
import { useAppContext } from "@/contexts/AppContext";

export function useBalances() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
    const { address } = useAppContext();

    const fetchTokenBalance = useCallback(async () => {
        try {
            if (!address) return;
            if (!Moralis.Core.isStarted) {
                await Moralis.start({
                    apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
                });
            }
            const chain = EvmChain.BSC_TESTNET;
            const response = await Moralis.EvmApi.token.getWalletTokenBalances({
                address,
                chain,
            });

            setTokenBalances(response.toJSON());
        } catch (e) {
            console.error("Error fetching data", e);
            setMessage("Error fetching data");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTokenBalance();
    }, [fetchTokenBalance]);

    return {
        message,
        loading,
        tokenBalances,
    };
}
