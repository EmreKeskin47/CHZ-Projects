import NFTDetails from "@/components/NFTDetails";
import Layout from "@/layout/Layout";
import { createListingFromPriceID } from "@/util/createListing";
import { getMarketplaceAddress } from "@/util/getContractAddress";
import { getMarketplaceContract, getNFTContract } from "@/util/getContracts";
import {
    Marketplace,
    RequiredParam,
    useCancelDirectListing,
    useCreateDirectListing,
    useGrantRole,
    useNFT,
    useValidDirectListings,
} from "@thirdweb-dev/react";
import { BigNumberish } from "ethers";
import router from "next/router";
import { useEffect, useState } from "react";

function NFTDetailsPage() {
    const [price, setPrice] = useState(0.01);
    const [listingID, setListingID] = useState("");
    const { id } = router.query;

    const { marketplace } = getMarketplaceContract();
    const { nft_contract } = getNFTContract();

    const { mutate: grantRole, error: roleError } = useGrantRole(nft_contract);

    const {
        mutate: createDirectListing,
        isLoading: listingLoading,
        error: listError,
    } = useCreateDirectListing(marketplace as RequiredParam<Marketplace>);

    const {
        mutate: cancelDirectListing,
        isLoading: delistLoading,
        error: delistError,
    } = useCancelDirectListing(marketplace);

    const { data: nft, isLoading: isNFTLoading } = useNFT(
        nft_contract,
        id as BigNumberish
    );

    const { data: directListings } = useValidDirectListings(marketplace, {
        start: 0,
        count: 100,
    });
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(event.target.value));
    };

    const handleListing = () => {
        try {
            //Grant Role
            grantRole({
                role: "admin",
                address: getMarketplaceAddress(),
            });

            const listing = createListingFromPriceID(price, id as string);

            // List NFT
            createDirectListing(listing);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelist = () => {
        try {
            cancelDirectListing(listingID);
            setPrice(0.001);
            setListingID("");
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        let listedNFT = directListings?.find((item) => item.tokenId === id);
        if (listedNFT) {
            setListingID(listedNFT.id);
            setPrice(Number(listedNFT.currencyValuePerToken.displayValue));
        }
    }, [directListings, price, listingID]);

    const RenderListCard = () => {
        return (
            <div className="relative bg-gray-800 text-white p-6 rounded-lg w-6/12 shadow-md mt-4">
                <h1 className="text-2xl font-semibold mb-2 ">Sell NFT</h1>

                <div>
                    <label className="font-bold text-xl">Price</label>
                    <input
                        className=" ml-2 bg-gray-800 w-20"
                        placeholder="Recipient Address"
                        type="number"
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>

                <button
                    onClick={handleListing}
                    className="mt-4 bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    List
                </button>

                {(roleError as unknown as boolean) ||
                    ((listError as unknown as boolean) && (
                        <div className="text-center mt-4">Error Listing!</div>
                    ))}
                {listingLoading && (
                    <div className="text-center mt-4">
                        Listing in progress...
                    </div>
                )}
            </div>
        );
    };

    const RenderAlreadyListedCard = () => {
        return (
            <div className="relative bg-gray-800 text-white p-6 rounded-lg w-8/12 shadow-md mt-4">
                <h1 className="text-2xl font-semibold mb-2 ">
                    NFT is already listed
                </h1>

                <div className="flex">
                    <div className="font-bold text-xl">Price</div>
                    <div className=" ml-2 text-xl">{price}</div>
                </div>

                <button
                    onClick={handleDelist}
                    className="mt-4 bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cancel Listing
                </button>

                {(delistError as unknown as boolean) && (
                    <div className="text-center mt-4">Error Delisting! </div>
                )}
                {delistLoading && (
                    <div className="text-center mt-4">
                        Cancel listing in progress...
                    </div>
                )}
            </div>
        );
    };

    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    NFT Details
                </h1>

                {isNFTLoading || !nft ? (
                    <div className="text-center">
                        {`Loading NFT with id ${id} `}
                    </div>
                ) : (
                    <>
                        <NFTDetails {...nft} />
                        {listingID ? (
                            <RenderAlreadyListedCard />
                        ) : (
                            <RenderListCard />
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
}
export default NFTDetailsPage;
