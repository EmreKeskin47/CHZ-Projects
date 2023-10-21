import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
    ThirdwebProvider,
    metamaskWallet,
} from "@thirdweb-dev/react";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThirdwebProvider
            activeChain={process.env.NEXT_PUBLIC_NETWORK}
            clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
            supportedWallets={[metamaskWallet()]}
        >

            <Component {...pageProps} />
        </ThirdwebProvider>
    );
}
