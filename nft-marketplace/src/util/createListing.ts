import { Listing } from "@/types/listing";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { BigNumberish } from "ethers";

export const createListingFromPriceID = (
    buyoutPricePerToken: number,
    tokenId: string | BigNumberish
): Listing => {
    let listing: Listing = {
        assetContractAddress:
            process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ?? "",
        tokenId,
        startTimestamp: new Date(Date.now()),
        listingDurationInSeconds: 5 * 24 * 60 * 60 * 1000,
        quantity: 1,
        currencyContractAddress: NATIVE_TOKEN_ADDRESS,
        buyoutPricePerToken,
        pricePerToken: buyoutPricePerToken.toString(),
    };
    return listing;
};
