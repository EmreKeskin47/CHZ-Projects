import React, { FC } from "react";
import Link from "next/link";
import { NFT } from "@/types/nft";

const NFTCard: FC<NFT> = (nft) => {
    return (
        <Link href={`/nft/${nft.metadata.id}`} passHref>
            <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <img
                    src={nft.metadata.image}
                    alt={nft.metadata.name}
                    className="mb-4 w-full h-56 object-contain rounded-md"
                    style={{ minHeight: "100%", minWidth: "100%" }}
                    onError={(e) => console.error("Image Error:", e)}
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
