import { useCallback, useEffect, useState } from "react";
import Moralis from "moralis";
import { TokenData } from "@/types/TokenData";
import { apiKey, token_address_list } from "@/util/addresses";
import { current_chain } from "@/util/chain";

export function useTokenMetadata() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [tokens, setTokens] = useState<TokenData[]>([]);

    const fetchTokenMetadata = useCallback(async () => {
        try {
            if (!Moralis.Core.isStarted) {
                await Moralis.start({ apiKey });
            }

            // const token_metadatas = await Moralis.EvmApi.token.getTokenMetadata(
            //     {
            //         addresses: token_address_list,
            //         chain: "chiliz",
            //     }
            // );
            // setTokens(token_metadatas.toJSON());

            const baseUrl = `https://deep-index.moralis.io/api/v2.2/erc20/metadata?chain=${current_chain}`;

            let fullUrl = baseUrl;
            token_address_list.forEach((address, index) => {
                const addressParam = `&addresses%5B${index}%5D=${address}`;
                fullUrl += addressParam;
            });

            const response = await fetch(fullUrl, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "X-API-Key": apiKey,
                },
            });
            const data = await response.json();
            setTokens(data);
        } catch (e) {
            setMessage("Error fetching token metadata");
            console.log("Error fetching token metadata", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTokenMetadata();
    }, [fetchTokenMetadata]);

    return {
        message,
        loading,
        tokens,
    };
}
