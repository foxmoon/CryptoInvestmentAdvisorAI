import type { CaipNetwork } from '@web3modal/core';
import type { Chain, Provider } from './EthersTypesUtil.js';
export declare const EthersHelpersUtil: {
    getCaipDefaultChain(chain?: Chain): CaipNetwork | undefined;
    hexStringToNumber(value: string): number;
    numberToHexString(value: number): string;
    getUserInfo(provider: Provider): Promise<{
        chainId: number;
        addresses: string[];
    }>;
    getChainId(provider: Provider): Promise<number>;
    getAddress(provider: Provider): Promise<string | undefined>;
    getAddresses(provider: Provider): Promise<string[]>;
    addEthereumChain(provider: Provider, chain: Chain): Promise<void>;
};
