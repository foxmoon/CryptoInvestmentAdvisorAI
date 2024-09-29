import type { ChainAdapter, Connector } from '../utils/TypeUtil.js';
import { type NetworkControllerState } from './NetworkController.js';
import { type AccountControllerState } from './AccountController.js';
import { type CaipAddress, type CaipNetwork, type ChainNamespace } from '@reown/appkit-common';
export interface ChainControllerState {
    activeChain: ChainNamespace | undefined;
    activeCaipAddress: CaipAddress | undefined;
    activeCaipNetwork?: CaipNetwork;
    chains: Map<ChainNamespace, ChainAdapter>;
    activeConnector?: Connector;
    universalAdapter: Pick<ChainAdapter, 'networkControllerClient' | 'connectionControllerClient'>;
    noAdapters: boolean;
}
type ChainsInitializerAdapter = Pick<ChainAdapter, 'connectionControllerClient' | 'networkControllerClient' | 'defaultNetwork' | 'chainNamespace' | 'adapterType' | 'caipNetworks'>;
export declare const ChainController: {
    state: ChainControllerState;
    subscribeKey<K extends keyof ChainControllerState>(key: K, callback: (value: ChainControllerState[K]) => void): () => void;
    subscribeChainProp<K_1 extends keyof ChainAdapter>(property: K_1, callback: (value: ChainAdapter[K_1] | undefined) => void, chain?: ChainNamespace): () => void;
    initialize(adapters: ChainsInitializerAdapter[]): void;
    initializeUniversalAdapter(adapter: ChainsInitializerAdapter, adapters: ChainsInitializerAdapter[]): void;
    setChainNetworkData(chain: ChainNamespace | undefined, props: Partial<NetworkControllerState>, replaceState?: boolean): void;
    setChainAccountData(chain: ChainNamespace | undefined, accountProps: Partial<AccountControllerState>, replaceState?: boolean): void;
    setAccountProp(prop: keyof AccountControllerState, value: AccountControllerState[keyof AccountControllerState], chain: ChainNamespace | undefined, replaceState?: boolean): void;
    setActiveNamespace(chain: ChainNamespace | undefined): void;
    setActiveCaipNetwork(caipNetwork: NetworkControllerState['caipNetwork']): void;
    /**
     * The setCaipNetwork function is being called for different purposes and it needs to be controlled if it should replace the NetworkController state or not.
     * While we initializing the adapters, we need to set the caipNetwork without replacing the state.
     * But when we switch the network, we need to replace the state.
     * @param chain
     * @param caipNetwork
     * @param shouldReplace - if true, it will replace the NetworkController state
     */
    setCaipNetwork(chain: ChainNamespace | undefined, caipNetwork: NetworkControllerState['caipNetwork'], shouldReplace?: boolean): void;
    setActiveConnector(connector: ChainControllerState['activeConnector']): void;
    getNetworkControllerClient(chainNamespace?: ChainNamespace): import("./NetworkController.js").NetworkControllerClient;
    getConnectionControllerClient(_chain?: ChainNamespace): import("./ConnectionController.js").ConnectionControllerClient;
    getAccountProp<K_2 extends keyof AccountControllerState>(key: K_2, _chain?: ChainNamespace): AccountControllerState[K_2] | undefined;
    getNetworkProp<K_3 extends keyof NetworkControllerState>(key: K_3, _chain?: ChainNamespace): NetworkControllerState[K_3] | undefined;
    getAllRequestedCaipNetworks(): NetworkControllerState['requestedCaipNetworks'];
    getAllApprovedCaipNetworks(): NetworkControllerState['approvedCaipNetworkIds'];
    resetAccount(chain: ChainNamespace | undefined): void;
};
export {};
