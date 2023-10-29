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

    const fetchTokenBalance = useCallback(async () => {
        try {
            if (!address) return;
            if (!Moralis.Core.isStarted) {
                await Moralis.start({ apiKey });
            }

            const token_balances = await fetch(
                `https://deep-index.moralis.io/api/v2.2/0x6648560A1a5800BE0843D987297bDe5D4b240Ab1/erc20?` +
                    new URLSearchParams({
                        chain: current_chain,
                    }),
                {
                    method: "get",
                    headers: {
                        accept: "application/json",
                        "X-API-Key": `${apiKey}`,
                    },
                }
            );

            const tokens = await token_balances.json();

            setTokenBalances(tokens);

            // const token_balances =
            //     await Moralis.EvmApi.token.getWalletTokenBalances({
            //         address,
            //         chain: current_chain,
            //     });
            //setTokenBalances(token_balances.toJSON());

            // const native_balance =
            //     await Moralis.EvmApi.balance.getNativeBalance({
            //         address,
            //         chain: current_chain,
            //     });
            // setNativeBalance(native_balance.toJSON());

            const native_balance = await fetch(
                `https://deep-index.moralis.io/api/v2.2/0x057Ec652A4F150f7FF94f089A38008f49a0DF88e/balance?` +
                    new URLSearchParams({
                        chain: current_chain,
                    }),
                {
                    method: "get",
                    headers: {
                        accept: "application/json",
                        "X-API-Key": `${apiKey}`,
                    },
                }
            );
            const native = await native_balance.json();
            setNativeBalance(native);
        } catch (error) {
            console.log("Error fetching token balances: ", error);
            setMessage("Error fetching token balances");
        } finally {
            setLoading(false);
        }
    }, []);

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
