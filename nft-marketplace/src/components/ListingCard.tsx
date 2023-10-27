import React, { FC, useState } from "react";
import { DirectListingV3 } from "@thirdweb-dev/sdk";
import { useAddress, useValidDirectListings } from "@thirdweb-dev/react";
import { getNFTAddress } from "@/util/getContractAddress";
import { getMarketplaceContract } from "@/util/getContracts";

const ListingCard: FC<DirectListingV3> = (nft) => {
    const [message, setMessage] = useState("");
    const nft_address = getNFTAddress();
    const { marketplace } = getMarketplaceContract();

    const address = useAddress();

    const { data: directListing } = useValidDirectListings(marketplace, {
        tokenContract: nft_address,
        tokenId: nft.asset.id,
    });

    const handleListing = async () => {
        try {
            if (directListing && directListing[0].creatorAddress !== address) {
                setMessage("Buying ...");
                let res = await marketplace?.directListings.buyFromListing(
                    directListing[0].id,
                    1
                );

                if (res && res.receipt) {
                    setMessage("Bought");
                }
            } else {
                setMessage("Already yours");
            }
        } catch (e) {
            setMessage("Error Buying!");
            console.log("Error buying", e);
        }
    };

    return (
        <div className=" relative text-white rounded-lg shadow-md w-full max-w-2xl relative">
            <img
                src={nft.asset.image ?? ""}
                alt="nft_img"
                className="w-full h-64 object-contain rounded-md z-0"
                style={{ minWidth: "100%", minHeight: "100% " }}
            />

            <div className="absolute bg-gray-800 bottom-0 left-0 right-0 opacity-90">
                <div className=" m-4">
                    <h2 className="text-2xl font-bold mb-2">
                        {nft.asset.name}
                    </h2>
                    <p className="text-gray-400">{nft.asset.description}</p>
                    <div className="flex justify-between mt-2">
                        <div>
                            <p className="text-gray-400">{`for ${nft.currencyValuePerToken.displayValue} ${nft.currencyValuePerToken.symbol}`}</p>
                            {message !== "" && <p>{message}</p>}
                        </div>
                        <button
                            className="bg-blue-500 bg-blue-700 text-white font-bold p-2 rounded"
                            onClick={handleListing}
                        >
                            Buy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
