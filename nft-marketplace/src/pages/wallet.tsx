import NFTCard from "@/components/NFTCard";
import Layout from "@/layout/Layout";
import { getNFTContract } from "@/util/getContracts";
import { useAddress, useOwnedNFTs } from "@thirdweb-dev/react";

export default function Wallet() {
    const { nft_contract } = getNFTContract();
    const address = useAddress();

    const { data: ownedNFTs, isLoading } = useOwnedNFTs(nft_contract, address);
    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    My NFTs
                </h1>

                {!address && (
                    <div>
                        <div className="text-center">
                            You need to connect your wallet first!
                        </div>
                    </div>
                )}

                {address && isLoading ? (
                    <div className="text-center">Loading NFT Data..</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 ">
                        {ownedNFTs &&
                            ownedNFTs.map((nft, id) => {
                                return <NFTCard key={id} {...nft} />;
                            })}
                    </div>
                )}
            </div>
        </Layout>
    );
}
