export type TokenBalance = {
    token_address: string;
    name: string;
    symbol: string;
    logo?: string;
    thumbnail?: string;
    decimals?: number;
    balance: string;
    possible_spam?: boolean;
    verified_collection?: boolean;
};
