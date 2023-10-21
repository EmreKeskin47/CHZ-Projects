import NFTDetails from "@/components/NFTDetails";
import Layout from "@/layout/Layout";
import { getMarketplaceContract, getNFTContract } from "@/util/getContracts";
import { useNFT, useValidDirectListings } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import CancelSellingCard from "@/components/CancelSelling";
import SellNFTCard from "@/components/SellNFTCard";
import { useRouter } from "next/router";

function NFTDetailsPage() {
    const router = useRouter();
    const [price, setPrice] = useState(0.01);
    const [symbol, setSymbol] = useState("");
    const [listingID, setListingID] = useState("");
    const [nftID, setNftID] = useState("");

    const { marketplace } = getMarketplaceContract();
    const { nft_contract } = getNFTContract();

    const { data: nft, isLoading: isNFTLoading } = useNFT(nft_contract, nftID);

    const { data: directListings } = useValidDirectListings(marketplace, {
        start: 0,
        count: 100,
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const { id } = router.query;
            setNftID(id as string);
        }
        let listedNFT = directListings?.find((item) => item.tokenId === nftID);
        if (listedNFT) {
            setListingID(listedNFT.id);
            setPrice(Number(listedNFT.currencyValuePerToken.displayValue));
            setSymbol(listedNFT.currencyValuePerToken.symbol);
        }
    }, [directListings, price, listingID, router.query]);

    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    NFT Details
                </h1>

                {isNFTLoading || !nft ? (
                    <div className="text-center">
                        {`Loading NFT with id ${nftID} `}
                    </div>
                ) : (
                    <>
                        <NFTDetails {...nft} />

                        {listingID ? (
                            <CancelSellingCard
                                price={price}
                                symbol={symbol}
                                listingID={listingID}
                            />
                        ) : (
                            <SellNFTCard
                                price={price}
                                onUpdatePrice={setPrice}
                                id={nftID}
                            />
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
}
export default NFTDetailsPage;
