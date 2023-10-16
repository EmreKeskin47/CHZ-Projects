export interface NFT {
    metadata: {
        background_color: string;
        customAnimationUrl: string;
        customImage: string;
        description: string;
        external_url: string;
        id: string;
        name: string;
        image: string;
        uri: string;
    };
    owner: string;
    supply: string;
    type: "ERC721";
}
