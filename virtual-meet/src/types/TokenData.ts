export type TokenData = {
    address: string;
    name: string;
    symbol: string;
    decimals: string;
    logo?: string;
    logo_hash?: string;
    thumbnail?: string;
    block_number?: string | null;
    validated?: string | null;
    created_at?: string | null;
    possible_spam?: boolean;
    verified_collection?: boolean;
};
