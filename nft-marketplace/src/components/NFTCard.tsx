import React, { FC } from "react";
import Link from "next/link";
import { NFT, ThirdwebNftMedia } from "@thirdweb-dev/react";

const NFTCard: FC<NFT> = (nft) => {
    return (
        <Link href={`/nft/${nft.metadata.id}`} passHref>
            <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <ThirdwebNftMedia
                    metadata={nft.metadata}
                    height={"100%"}
                    width={"100%"}
                    style={{ maxHeight: 300 }}
                />

                <div className="h-24 bottom-0 left-0 right-0 opacity-75">
                    <div className="bottom-4 left-0 right-0 p-1">
                        <h2 className="text-2xl font-bold mb-2">
                            {nft.metadata.name}
                        </h2>
                        <p className="mb-2 text-gray-400">
                            {nft.metadata.description}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NFTCard;
