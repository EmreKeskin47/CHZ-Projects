import { useEffect, useState, useCallback } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NFT } from "@/types/nft";
import { Metadata } from "@/types/metadata";
import { BigNumber } from "ethers";
import { Owners } from "@/types/owners";
import { MintMetadata } from "@/types/mintMetadata";

export function useNFTContract() {
    const [metadata, setMetadata] = useState<Metadata | null>(null);
    const [balance, setBalance] = useState<BigNumber>();
    const [owners, setOwners] = useState<Owners[]>([]);
    const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
    const [ownerAddress, setOwnerAddress] = useState<string | null>(null);
    const [feeRecipient, setFeeRecipient] = useState<string | null>(null);
    const [allNFTs, setAllNFTs] = useState<NFT[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const sdk = ThirdwebSDK.fromPrivateKey(
                process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY ?? "",
                process.env.NEXT_PUBLIC_NETWORK ?? "",
                {
                    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
                    secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
                }
            );

            const contract = await sdk.getContract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? ""
            );

            // Fetch metadata
            const metadata = await contract.metadata.get();
            setMetadata(metadata as Metadata);

            // Fetch wallet address
            const walletAddress = await sdk.wallet.getAddress();

            // Fetch balance
            const balance = await contract.erc721.balanceOf(walletAddress);
            setBalance(balance);

            // Fetch owners
            const owners = await contract.erc721.getAllOwners();
            setOwners(owners);

            // Fetch owned NFTs
            const nfts = await contract.erc721.getOwned(walletAddress);
            setOwnedNFTs(nfts as NFT[]);

            // Fetch owner address
            const ownerAddress = await contract.owner.get();
            setOwnerAddress(ownerAddress);

            // Fetch fee recipient
            const feeInfo = await contract.platformFees.get();
            setFeeRecipient(feeInfo.platform_fee_recipient);

            // Fetch all NFTs
            const response = await contract.erc721.getAll();
            setAllNFTs(response as NFT[]);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching NFTs:", error);
        }
    }, []);

    const mintNFTs = async (
        metadatas: MintMetadata[]
    ): Promise<{
        receipt?: any;
        firstTokenId?: BigNumber;
        errorMessage?: string;
    }> => {
        try {
            const sdk = ThirdwebSDK.fromPrivateKey(
                process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY ?? "",
                process.env.NEXT_PUBLIC_NETWORK ?? "",
                {
                    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
                    secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
                }
            );

            const contract = await sdk.getContract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? ""
            );
            const walletAddress = await sdk.wallet.getAddress();

            // Mint NFTs
            const tx = await contract.erc721.mintBatchTo(
                walletAddress,
                metadatas
            );
            const receipt = tx[0].receipt;
            const firstTokenId = tx[0].id;

            return { receipt, firstTokenId };
        } catch (error) {
            console.error("Error minting NFTs:", error);
            return { errorMessage: "errorMessage" + error };
        }
    };

    const transferNFT = async (
        tokenId: string,
        to: string
    ): Promise<{
        receipt?: any;
        errorMessage?: string;
    }> => {
        try {
            const sdk = ThirdwebSDK.fromPrivateKey(
                process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY ?? "",
                process.env.NEXT_PUBLIC_NETWORK ?? "",
                {
                    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
                    secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
                }
            );

            const contract = await sdk.getContract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? ""
            );

            // Transfer NFT
            let res = await contract.erc721.transfer(to, tokenId);

            return { receipt: res.receipt };
        } catch (error) {
            console.error("Error transfering NFTs:", error);
            return { errorMessage: "Error transfering" };
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        loading,
        metadata,
        balance,
        owners,
        allNFTs,
        ownerAddress,
        feeRecipient,
        ownedNFTs,
        mintNFTs,
        transferNFT,
    };
}
