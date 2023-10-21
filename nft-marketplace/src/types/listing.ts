import { NewDirectListing } from "@thirdweb-dev/sdk";

export type Listing = NewDirectListing & {
    pricePerToken: string;
};
