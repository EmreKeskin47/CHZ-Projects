import { useCallback, useEffect, useState } from "react";
import Moralis from "moralis";
import { TokenData } from "@/types/TokenData";
import { apiKey, token_address_list } from "@/util/addresses";
import { current_chain } from "@/util/chain";

export function useTokenMetadata() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [tokens, setTokens] = useState<TokenData[]>([]);

    const fetchTokenMetadatas = useCallback(async () => {
        try {
            if (!Moralis.Core.isStarted) {
                await Moralis.start({
                    apiKey,
                });
            }

            const response = await Moralis.EvmApi.token.getTokenMetadata({
                addresses: token_address_list,
                chain: current_chain,
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
        fetchTokenMetadatas();
    }, [fetchTokenMetadatas]);

    return {
        message,
        loading,
        tokens,
    };
}
