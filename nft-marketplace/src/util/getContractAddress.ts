export const getMarketplaceAddress = () => {
    return process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS ?? "";
};

export const getNFTAddress = () => {
    return process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ?? "";
};
