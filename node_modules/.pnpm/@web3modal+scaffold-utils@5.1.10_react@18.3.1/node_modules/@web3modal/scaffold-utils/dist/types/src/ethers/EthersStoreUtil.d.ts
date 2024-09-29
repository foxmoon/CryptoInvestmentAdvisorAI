import type { Address, CombinedProvider, Provider } from './EthersTypesUtil.js';
import type { W3mFrameTypes } from '@web3modal/wallet';
export type Status = 'reconnecting' | 'connected' | 'disconnected';
export interface EthersStoreUtilState {
    provider?: Provider | CombinedProvider;
    providerType?: 'walletConnect' | 'injected' | 'coinbaseWallet' | 'eip6963' | 'w3mAuth' | 'coinbaseWalletSDK';
    address?: Address;
    chainId?: number;
    error?: unknown;
    preferredAccountType?: W3mFrameTypes.AccountType;
    status: Status;
    isConnected: boolean;
}
export declare const EthersStoreUtil: {
    state: EthersStoreUtilState;
    subscribeKey<K extends keyof EthersStoreUtilState>(key: K, callback: (value: EthersStoreUtilState[K]) => void): () => void;
    subscribe(callback: (newState: EthersStoreUtilState) => void): () => void;
    setProvider(provider: EthersStoreUtilState['provider']): void;
    setProviderType(providerType: EthersStoreUtilState['providerType']): void;
    setAddress(address: EthersStoreUtilState['address']): void;
    setPreferredAccountType(preferredAccountType: EthersStoreUtilState['preferredAccountType']): void;
    setChainId(chainId: EthersStoreUtilState['chainId']): void;
    setStatus(status: EthersStoreUtilState['status']): void;
    setIsConnected(isConnected: EthersStoreUtilState['isConnected']): void;
    setError(error: EthersStoreUtilState['error']): void;
    reset(): void;
};
