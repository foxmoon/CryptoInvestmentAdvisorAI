type Suggestion = {
    name: string;
    registered: boolean;
};
export interface EnsControllerState {
    suggestions: Suggestion[];
    loading: boolean;
}
export declare const EnsController: {
    state: EnsControllerState;
    subscribe(callback: (newState: EnsControllerState) => void): () => void;
    subscribeKey<K extends keyof EnsControllerState>(key: K, callback: (value: EnsControllerState[K]) => void): () => void;
    resolveName(name: string): Promise<import("../utils/TypeUtil.js").BlockchainApiLookupEnsName>;
    isNameRegistered(name: string): Promise<boolean>;
    getSuggestions(name: string): Promise<Suggestion[]>;
    getNamesForAddress(address: string): Promise<import("../utils/TypeUtil.js").BlockchainApiLookupEnsName[]>;
    registerName(name: string): Promise<void>;
    validateName(name: string): boolean;
    parseEnsApiError(error: unknown, defaultError: string): string;
};
export {};
