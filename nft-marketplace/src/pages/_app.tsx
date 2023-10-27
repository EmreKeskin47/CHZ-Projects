import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { SpicyChain } from "@thirdweb-dev/chains";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThirdwebProvider
            activeChain={SpicyChain}
            clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
            supportedWallets={[metamaskWallet()]}
        >
            <Component {...pageProps} />
        </ThirdwebProvider>
    );
}
