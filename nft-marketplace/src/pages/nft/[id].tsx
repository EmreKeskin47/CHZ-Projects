import NFTDetails from "@/components/NFTDetails";
import { useNFTContract } from "@/hooks/useNFTContract";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";
import { useState } from "react";

function NFTDetailsPage() {
    const { loading, allNFTs, transferNFT } = useNFTContract();
    const router = useRouter();
    const [address, setAddress] = useState("");
    const [transferMessage, setTransferMessage] = useState("");

    const { id } = router.query;
    const nft = allNFTs.find((nft) => nft.metadata.id === id);
    const handleAddresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        setTransferMessage("Transfer in progress...");
        event.preventDefault();
        let res = await transferNFT(id as string, address);

        if (res.errorMessage) {
            setTransferMessage(res.errorMessage);
        } else {
            setTransferMessage(`Transfer NFT with id ${id} successful`);
        }
    };

    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    NFT Details
                </h1>

                {loading || !nft ? (
                    <div className="text-center">
                        {`Loading NFT with id ${id} `}
                    </div>
                ) : (
                    <>
                        <NFTDetails {...nft} />
                        <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-2xl mt-4">
                            <h1 className="text-xl font-semibold mb-2 text-center">
                                You can transfer this NFT using address bar
                                below
                            </h1>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label className="font-bold text-xl">
                                        Address:
                                    </label>
                                    <input
                                        className=" ml-2 bg-gray-800 w-80"
                                        placeholder="Recipient Address"
                                        type="text"
                                        value={address}
                                        onChange={handleAddresChange}
                                    />
                                </div>

                                <button
                                    className="mt-4 bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    type="submit"
                                >
                                    Transfer
                                </button>
                            </form>
                            {transferMessage !== "" && (
                                <div className="text-center mt-4">
                                    {transferMessage}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}
export default NFTDetailsPage;
