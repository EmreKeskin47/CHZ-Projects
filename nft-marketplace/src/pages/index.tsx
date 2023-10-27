import ListingCard from "@/components/ListingCard";
import Layout from "@/layout/Layout";
import { getMarketplaceAddress } from "@/util/getContractAddress";
import { useContract, useValidDirectListings } from "@thirdweb-dev/react";

function Home() {
    const { contract: marketplace } = useContract(
        getMarketplaceAddress(),
        "marketplace-v3"
    );

    const { data: directListings, isLoading } = useValidDirectListings(
        marketplace,
        {
            start: 0,
            count: 100,
        }
    );

    return (
        <Layout>
            {isLoading ? (
                <div className="text-center">
                    Loading NFT marketplace data ...
                </div>
            ) : (
                <div>
                    <div>
                        <h1 className="text-3xl font-semibold my-12 text-center">
                            Listed NFTs
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {directListings &&
                                directListings.map((listedNFT, id) => {
                                    return (
                                        <ListingCard {...listedNFT} key={id} />
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
export default Home;
