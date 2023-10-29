import BackToHub from "@/components/BackToHub";
import { TokenData } from "@/types/TokenData";
import React, { type FC } from "react";

const TokenCard: FC<TokenData> = (token) => {
    let createDate = null;
    if (token.created_at) {
        let date = new Date(token.created_at);
        createDate = date.toLocaleDateString();
    }

    return (
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md ">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-1">{token.name}</h2>
                    <strong>Symbol:</strong> {token.symbol}
                    <div className="my-1">
                        <strong>Decimals:</strong> {token.decimals}
                    </div>
                    <div className="mt-1 ">
                        <strong>Token Address:</strong> {token.address}
                    </div>
                </div>

                {token.logo && (
                    <img
                        src={token.logo}
                        alt={`${token.name} logo`}
                        className="mb-2 w-24 h-24 rounded-full"
                    />
                )}
            </div>

            <hr className="border-t-2 border-gray-300 my-4" />

            {token.block_number && (
                <div className="my-2">
                    <strong>Block Number:</strong> {token.block_number}
                </div>
            )}
            {createDate && (
                <div className="my-2">
                    <strong>Created At:</strong> {createDate}
                </div>
            )}

            <div className="mb-2">
                <strong>Possible Spam:</strong>{" "}
                {token.possible_spam ? "Yes" : "No"}
            </div>
            <div className="mb-2">
                <strong>Verified Collection:</strong>{" "}
                {token.verified_collection ? "Yes" : "No"}
            </div>
            {token.logo_hash && (
                <div className="my-2">
                    <strong>Logo Hash:</strong> {token.logo_hash}
                </div>
            )}
        </div>
    );
};

function FanTokensListPage() {
    return (
        <div>
            <h1 className="my-8 text-center text-3xl font-bold  ">
                Fan Tokens
            </h1>
            <div className=" mx-4 my-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"></div>

            <BackToHub />
        </div>
    );
}

export default FanTokensListPage;
