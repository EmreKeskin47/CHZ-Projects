import CardLink from "@/components/CardLink";
import NFTCard from "@/components/NFTCard";
import { useNFTContract } from "@/hooks/useNFTContract";
import styles from "@/styles/Home.module.css";

const OptionsGrid = () => {
    return (
        <div className={styles.grid}>
            <CardLink
                href="/wallet"
                title="Your NFTs"
                description="See NFTs you own"
            />
            <CardLink
                href="/info"
                title="View Contract Info"
                description="See details about the NFT contrcat"
            />
            <CardLink
                href="/mint"
                title="Mint NFT"
                description="Mint new NFT"
            />
            <CardLink
                href="/tokens"
                title="Fan Tokens"
                description="See every fan token"
            />
        </div>
    );
};
function Home() {
    const { loading, allNFTs } = useNFTContract();
    return (
        <main className={styles.main}>
            <OptionsGrid />

            <div className={styles.center}>
                <div>
                    <h1 className="text-6xl font-semibold mb-12 text-center">
                        All NFTs
                    </h1>

                    {loading ? (
                        <div className="text-center">Loading NFT Data..</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {allNFTs.map((nft, id) => {
                                return <NFTCard key={id} {...nft} />;
                            })}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
export default Home;
