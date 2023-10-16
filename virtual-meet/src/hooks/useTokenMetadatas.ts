import { useCallback, useEffect, useState } from "react";
import Moralis from "moralis";
import { EvmChain } from "moralis/common-evm-utils";
import { TokenData } from "@/types/TokenData";

export function useTokenMetadata() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const address = "0xC9625A1066c14Db79a08B4Ad9c6561B456326BFf";
    const [tokens, setTokens] = useState<TokenData[]>([]);

    const fetchTokenBalance = useCallback(async () => {
        try {
            if (!address) return;
            if (!Moralis.Core.isStarted) {
                await Moralis.start({
                    apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
                });
            }
            const addresses = [
                "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                "0x514910771AF9Ca656af840dff83E8264EcF986CA",
            ];

            const chain = EvmChain.ETHEREUM;

            const response = await Moralis.EvmApi.token.getTokenMetadata({
                addresses,
                chain,
            });

            setTokens(response.toJSON());
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
        tokens,
    };
}
