import BackToHub from "@/components/BackToHub";
import { TokenBalance } from "@/types/TokenBalance";
import React, { type FC } from "react";
import styles from "@/styles/Home.module.css";

const TokenCard: FC<TokenBalance> = (token) => {
    return (
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md ">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-1">{token.name}</h2>
                    <strong>Symbol:</strong> {token.symbol}
                    <div className="my-1">
                        <strong>Balance:</strong> {token.balance}
                    </div>
                    <div className="mt-1 ">
                        <strong>Token Address:</strong> {token.token_address}
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

            <div className="mb-2">
                <strong>Decimals:</strong> {token.decimals}
            </div>

            <div className="mb-2">
                <strong>Possible Spam:</strong>{" "}
                {token.possible_spam ? "Yes" : "No"}
            </div>
            <div className="mb-2">
                <strong>Verified Collection:</strong>{" "}
                {token.verified_collection ? "Yes" : "No"}
            </div>
        </div>
    );
};

function BalancesPage() {
    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <div>
                    <h1 className="my-8 text-center text-3xl font-bold  ">
                        My Tokens
                    </h1>

                    <div>
                        <h2 className="my-8 text-center text-xl font-bold  ">
                            {/* {`Native Balance is ${formatBalance(
                                    nativeBalance?.balance
                                )} `} */}
                        </h2>
                        <div className=" mx-4 my-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"></div>
                    </div>

                    <BackToHub />
                </div>
            </div>
        </main>
    );
}

export default BalancesPage;
