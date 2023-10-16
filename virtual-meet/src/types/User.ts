export type User = {
    id: string;
    domain: string;
    chainId: number;
    address: string;
    uri: string;
    version: string;
    nonce: string;
    profileId: string;
    payload: null;
};

export interface UserProps {
    user: User;
}
