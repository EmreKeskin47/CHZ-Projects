import { useNFTContract } from "@/hooks/useNFTContract";
import Layout from "@/layout/Layout";

export default function Info() {
    const { loading, metadata, ownerAddress } = useNFTContract();
    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    Contract Details
                </h1>

                {loading || !metadata ? (
                    <div className="text-center">Loading Contract Info..</div>
                ) : (
                    <div className=" text-white p-6 rounded-lg shadow-md w-full max-w-2xl mt-6">
                        <h2 className="font-bold text-xl">Metadata</h2>
                        <div className="pl-4">
                            <p>
                                <strong>Name:</strong> {metadata.name}
                            </p>
                            <p>
                                <strong>Description:</strong>{" "}
                                {metadata.description}
                            </p>
                            <p>
                                <strong>Symbol:</strong> {metadata.symbol}
                            </p>
                            <p>
                                <strong>Fee Recipient:</strong>{" "}
                                {metadata.fee_recipient}
                            </p>
                            <p>
                                <strong>Seller Fee Basis Points:</strong>{" "}
                                {metadata.seller_fee_basis_points}
                            </p>
                        </div>
                        <h2 className="font-bold text-xl mt-4">
                            Contract Owner
                        </h2>
                        <p className="pl-4">{ownerAddress}</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
