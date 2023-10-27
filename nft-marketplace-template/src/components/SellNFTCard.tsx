import { createListingFromPriceID } from "@/util/createListing";
import { getMarketplaceAddress } from "@/util/getContractAddress";
import { getMarketplaceContract, getNFTContract } from "@/util/getContracts";
import {
    Marketplace,
    RequiredParam,
    useCreateDirectListing,
    useGrantRole,
} from "@thirdweb-dev/react";
import { type FC } from "react";

interface SellNFTCardProps {
    price: number;
    onUpdatePrice: (newPrice: number) => void;
    id: string;
}

const SellNFTCard: FC<SellNFTCardProps> = ({ price, onUpdatePrice, id }) => {


    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onUpdatePrice(Number(event.target.value));
    };

    const handleListing = () => {
       
    };

    return (
        <div className="relative bg-gray-800 text-white p-6 rounded-lg w-6/12 shadow-md mt-4">
            <h1 className="text-2xl font-semibold mb-2 ">Sell NFT</h1>

            <div>
                <label className="font-bold text-xl">Price</label>
                <input
                    className=" ml-2 bg-gray-800 w-20"
                    placeholder="Recipient Address"
                    type="number"
                    value={price}
                    onChange={handlePriceChange}
                />
            </div>

            <button
                onClick={handleListing}
                className="mt-4 bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                List
            </button>

        </div>
    );
};
export default SellNFTCard;
