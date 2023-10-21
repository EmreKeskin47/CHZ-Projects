import Layout from "@/layout/Layout";
import { MintMetadata } from "@/types/mintMetadata";
import { getNFTContract } from "@/util/getContracts";
import { useAddress, useMintNFT } from "@thirdweb-dev/react";
import { useState } from "react";

export default function Wallet() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const { nft_contract } = getNFTContract();

    const { mutate: mintNFT, isLoading, error } = useMintNFT(nft_contract);
    const address = useAddress();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescription(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        try {
            event.preventDefault();

            if (name === "" || description === "" || image === "") {
                return;
            }

            const metadata: MintMetadata = {
                metadata: {
                    name,
                    description,
                    image,
                },
                to: address ?? "",
                supply: 1,
            };

            mintNFT(metadata);
        } catch (e) {
            console.log("Error Minting", e);
        }
    };
    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    Mint new NFT
                </h1>

                <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                    <h1 className="text-2xl font-semibold my-4 text-center">
                        Fill details about the NFT you want to mint{" "}
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="font-bold text-xl">Name:</label>
                            <input
                                className=" ml-2 bg-gray-800"
                                placeholder="Name of the NFT"
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div>
                            <label className="font-bold text-xl">
                                Description:{" "}
                            </label>
                            <input
                                className=" ml-2 bg-gray-800"
                                placeholder="Description of the NFT"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </div>
                        <div>
                            <label className="font-bold text-xl">
                                Image URL:
                            </label>
                            <input
                                className=" ml-2 bg-gray-800 w-80"
                                placeholder="Image of the NFT"
                                type="text"
                                value={image}
                                onChange={handleImageChange}
                            />
                        </div>
                        <button
                            className="mt-6 bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
                            type="submit"
                        >
                            Mint
                        </button>
                    </form>

                    {isLoading && (
                        <div className="text-center mt-4">
                            Minting in progress ...
                        </div>
                    )}
                    {(error as unknown as boolean) && (
                        <div className="text-center mt-4">
                            Minting in progress ...
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
