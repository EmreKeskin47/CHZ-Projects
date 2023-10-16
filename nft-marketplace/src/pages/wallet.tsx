import NFTCard from "@/components/NFTCard";
import { useNFTContract } from "@/hooks/useNFTContract";
import Layout from "@/layout/Layout";

export default function Wallet() {
    const { loading, ownedNFTs } = useNFTContract();
    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    My NFTs
                </h1>

                {loading ? (
                    <div className="text-center">Loading NFT Data..</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 ">
                        {ownedNFTs.map((nft, id) => {
                            return <NFTCard key={id} {...nft} />;
                        })}
                    </div>
                )}
            </div>
        </Layout>
    );
}
