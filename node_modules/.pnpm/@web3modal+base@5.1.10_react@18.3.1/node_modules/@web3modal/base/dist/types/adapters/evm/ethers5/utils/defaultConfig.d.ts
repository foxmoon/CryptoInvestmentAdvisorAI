import '@web3modal/polyfills';
import type { Chain, Metadata, ProviderType } from '@web3modal/scaffold-utils/ethers';
import type { SocialProvider } from '@web3modal/scaffold-utils';
export interface ConfigOptions {
    enableEIP6963?: boolean;
    enableCoinbase?: boolean;
    auth?: {
        email?: boolean;
        socials?: SocialProvider[];
        showWallets?: boolean;
        walletFeatures?: boolean;
    };
    enableInjected?: boolean;
    rpcUrl?: string;
    defaultChainId?: number;
    metadata: Metadata;
    chains?: Chain[];
    coinbasePreference?: 'all' | 'smartWalletOnly' | 'eoaOnly';
}
export declare function defaultConfig(options: ConfigOptions): ProviderType;
