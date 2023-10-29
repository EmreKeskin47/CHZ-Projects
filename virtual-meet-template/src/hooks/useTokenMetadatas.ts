import { useCallback, useEffect, useState } from "react";
import Moralis from "moralis";
import { TokenData } from "@/types/TokenData";
import { apiKey, token_address_list } from "@/util/addresses";
import { current_chain } from "@/util/chain";

export function useTokenMetadata() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [tokens, setTokens] = useState<TokenData[]>([]);

    const fetchTokenMetadata = useCallback(async () => {}, []);

    useEffect(() => {
        fetchTokenMetadata();
    }, [fetchTokenMetadata]);

    return {
        message,
        loading,
        tokens,
    };
}
