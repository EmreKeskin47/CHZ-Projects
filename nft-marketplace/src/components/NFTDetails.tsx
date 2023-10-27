import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import React, { FC } from "react";

const NFTDetails: FC<NFT> = (nft) => {
    return (
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-2xl">
            <div className="flex w-full justify-between mb-4">
                <h2 className="text-2xl font-bold">{nft.metadata.name}</h2>
                <h2 className="text-2xl font-bold ">{`ID:${nft.metadata.id}`}</h2>
            </div>
            <ThirdwebNftMedia
                metadata={nft.metadata}
                height={"100%"}
                width={"100%"}
                style={{ maxHeight: 450 }}
            />
            <div className="mb-2 text-center">
                <strong>{nft.metadata.description}</strong>
            </div>
            {nft.metadata.external_url && (
                <div className="mb-2">
                    <strong>External URL:</strong>{" "}
                    <a
                        href={nft.metadata.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400"
                    >
                        {nft.metadata.external_url}
                    </a>
                </div>
            )}

            <div className="mb-2">
                <strong>Supply:</strong> {nft.supply}
            </div>
            <div className="mb-2">
                <strong>Type:</strong> {nft.type}
            </div>
            <div className="mb-2">
                <strong>Owner:</strong> {nft.owner}
            </div>
        </div>
    );
};

export default NFTDetails;
