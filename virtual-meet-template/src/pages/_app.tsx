import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import { AppContextProvider } from "@/contexts/AppContext";

const config = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
        chain: mainnet,
        transport: http(),
    }),
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig config={config}>
            <AppContextProvider>
                <Component {...pageProps} />
            </AppContextProvider>
        </WagmiConfig>
    );
}
