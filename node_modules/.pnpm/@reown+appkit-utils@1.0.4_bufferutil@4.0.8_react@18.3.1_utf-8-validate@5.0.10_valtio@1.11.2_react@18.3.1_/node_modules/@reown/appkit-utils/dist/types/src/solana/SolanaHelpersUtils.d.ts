import type { CaipNetwork } from '@reown/appkit-common';
import type { Provider } from './SolanaTypesUtil.js';
export declare const SolHelpersUtil: {
    detectRpcUrl(chain: CaipNetwork, projectId: string): string;
    getChain(chains: CaipNetwork[], chainId: string | null): CaipNetwork;
    getChainFromCaip(chains: CaipNetwork[], chainCaipId?: string | undefined | null): CaipNetwork;
    getCaipDefaultChain(chain?: CaipNetwork): CaipNetwork | undefined;
    hexStringToNumber(value: string): number;
    getAddress(provider: Provider): string | undefined;
};
