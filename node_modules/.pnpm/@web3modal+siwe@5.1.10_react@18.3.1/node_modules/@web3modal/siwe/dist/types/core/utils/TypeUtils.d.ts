export interface SIWESession {
    address: string;
    chainId: number;
}
interface CacaoHeader {
    t: 'caip122';
}
export interface SIWECreateMessageArgs {
    chainId: number;
    domain: string;
    nonce: string;
    uri: string;
    address: string;
    version: '1';
    type?: CacaoHeader['t'];
    nbf?: string;
    exp?: string;
    statement?: string;
    requestId?: string;
    resources?: string[];
    expiry?: number;
    iat?: string;
}
export type SIWEMessageArgs = {
    chains: number[];
    methods?: string[];
} & Omit<SIWECreateMessageArgs, 'address' | 'chainId' | 'nonce' | 'version'>;
interface CacaoPayload {
    domain: string;
    aud: string;
    nonce: string;
    iss: string;
    version?: string;
    iat?: string;
    nbf?: string;
    exp?: string;
    statement?: string;
    requestId?: string;
    resources?: string[];
    type?: string;
}
interface Cacao {
    h: CacaoHeader;
    p: CacaoPayload;
    s: {
        t: 'eip191' | 'eip1271';
        s: string;
        m?: string;
    };
}
export interface SIWEVerifyMessageArgs {
    message: string;
    signature: string;
    cacao?: Cacao;
}
export interface SIWEClientMethods {
    getNonce: (address?: string) => Promise<string>;
    getMessageParams?: () => Promise<SIWEMessageArgs>;
    createMessage: (args: SIWECreateMessageArgs) => string;
    verifyMessage: (args: SIWEVerifyMessageArgs) => Promise<boolean>;
    getSession: () => Promise<SIWESession | null>;
    signOut: () => Promise<boolean>;
    onSignIn?: (session?: SIWESession) => void;
    onSignOut?: () => void;
}
export interface SIWEConfig extends SIWEClientMethods {
    enabled?: boolean;
    nonceRefetchIntervalMs?: number;
    sessionRefetchIntervalMs?: number;
    signOutOnDisconnect?: boolean;
    signOutOnAccountChange?: boolean;
    signOutOnNetworkChange?: boolean;
}
export {};
