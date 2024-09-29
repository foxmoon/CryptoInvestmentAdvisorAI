import { type CaipNetwork, type CaipNetworkId, type ChainNamespace } from '@reown/appkit-common';
export interface NetworkControllerClient {
    switchCaipNetwork: (network: NetworkControllerState['caipNetwork']) => Promise<void>;
    getApprovedCaipNetworksData: () => Promise<{
        approvedCaipNetworkIds: NetworkControllerState['approvedCaipNetworkIds'];
        supportsAllNetworks: NetworkControllerState['supportsAllNetworks'];
    }>;
}
export interface NetworkControllerState {
    supportsAllNetworks: boolean;
    isUnsupportedChain?: boolean;
    _client?: NetworkControllerClient;
    caipNetwork?: CaipNetwork;
    requestedCaipNetworks?: CaipNetwork[];
    approvedCaipNetworkIds?: CaipNetworkId[];
    allowUnsupportedCaipNetwork?: boolean;
    smartAccountEnabledNetworks?: number[];
}
export declare const NetworkController: {
    state: NetworkControllerState;
    replaceState(newState: NetworkControllerState | undefined): void;
    subscribeKey<K extends keyof NetworkControllerState>(property: K, callback: (val: NetworkControllerState[K]) => void): () => void;
    _getClient(): NetworkControllerClient;
    setActiveCaipNetwork(caipNetwork: NetworkControllerState['caipNetwork']): void;
    setCaipNetwork(caipNetwork: NetworkControllerState['caipNetwork']): void;
    setRequestedCaipNetworks(requestedNetworks: NetworkControllerState['requestedCaipNetworks'], chain: ChainNamespace | undefined): void;
    setAllowUnsupportedChain(allowUnsupportedCaipNetwork: NetworkControllerState['allowUnsupportedCaipNetwork'], chain: ChainNamespace | undefined): void;
    setSmartAccountEnabledNetworks(smartAccountEnabledNetworks: NetworkControllerState['smartAccountEnabledNetworks'], chain: ChainNamespace | undefined): void;
    getRequestedCaipNetworks(chainToFilter?: ChainNamespace): CaipNetwork[];
    switchActiveNetwork(network: NetworkControllerState['caipNetwork']): Promise<void>;
    getApprovedCaipNetworkIds(chainToFilter?: ChainNamespace): (`eip155:${string}` | `eip155:${number}` | `solana:${string}` | `solana:${number}` | `polkadot:${string}` | `polkadot:${number}`)[] | undefined;
    setApprovedCaipNetworksData(chain: ChainNamespace | undefined): Promise<void>;
    checkIfSupportedNetwork(): boolean;
    checkIfSmartAccountEnabled(): boolean;
    resetNetwork(): void;
    getSupportsAllNetworks(): boolean | undefined;
    showUnsupportedChainUI(): void;
    getActiveNetworkTokenAddress(): string;
};
