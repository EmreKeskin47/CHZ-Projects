import CardLink from "@/components/CardLink";
import { useAppContext } from "@/contexts/AppContext";
import { useAuth } from "@/hooks/useAuth";
import styles from "@/styles/Home.module.css";

const ConnectWalletBtn = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClick}
        >
            Connect Wallet
        </button>
    );
};

const OptionsGrid = () => {
    return (
        <div className={styles.grid}>
            <CardLink
                href="/balances"
                title="Token Balance"
                description="See the tokens you own in Chilliz Spicy Testnet"
            />
            <CardLink
                href="/meet"
                title="Meet"
                description="Discover Virtual Meetup exclusive for token holders"
            />
            <CardLink
                href="/vote"
                title="Proposal"
                description="Create proposal or vote on an existing one"
            />
            <CardLink
                href="/fantokens"
                title="FanTokens"
                description="See every fan token"
            />
        </div>
    );
};
function Hub() {
    const { isConnected } = useAppContext();
    const { handleConnect } = useAuth();

    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <div>
                    <h1 className="text-6xl font-semibold my-4 text-center">
                        Welcome to the Hub
                    </h1>

                    <h2 className="text-4xl  mt-14 text-center">
                        Only Fan Token Holders can vote on <br />
                        exclusive events and join virtual meetups
                    </h2>
                </div>
            </div>
            {isConnected ? (
                <OptionsGrid />
            ) : (
                <ConnectWalletBtn onClick={handleConnect} />
            )}
        </main>
    );
}
export default Hub;
