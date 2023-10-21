import { Metadata } from "@/types/metadata";
import { FC } from "react";

type MetadataProps = {
    metadata: Metadata;
    title: string;
};

const ContractMetadata: FC<MetadataProps> = ({ metadata, title }) => {
    return (
        <div>
            <h1 className="text-3xl font-semibold mb-2 mt-8 text-center">
                {title}
            </h1>

            <div className=" text-white p-6 rounded-lg shadow-md w-full max-w-2xl mt-6">
                <h2 className="font-bold text-xl">Metadata</h2>
                {metadata.name && (
                    <div>
                        <strong>Name:</strong> {metadata.name}
                    </div>
                )}
                {metadata.description && (
                    <div>
                        <strong>Description:</strong> {metadata.description}
                    </div>
                )}
                {metadata.symbol && (
                    <div>
                        <strong>Symbol:</strong> {metadata.symbol}
                    </div>
                )}
                {metadata.fee_recipient && (
                    <div>
                        <strong>Fee Recipient:</strong> {metadata.fee_recipient}
                    </div>
                )}
                {metadata.seller_fee_basis_points !== undefined && (
                    <div>
                        <strong>Seller Fee Basis Points: </strong>
                        {metadata.seller_fee_basis_points}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContractMetadata;
