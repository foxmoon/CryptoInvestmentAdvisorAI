import { type CreateConfigParameters } from '@wagmi/core';
import { W3mFrameProvider } from '@web3modal/wallet';
import type { SocialProvider } from '@web3modal/scaffold-utils';
interface W3mFrameProviderOptions {
    projectId: string;
}
export type AuthParameters = {
    chains?: CreateConfigParameters['chains'];
    options: W3mFrameProviderOptions;
    socials?: SocialProvider[];
    email?: boolean;
    showWallets?: boolean;
    walletFeatures?: boolean;
};
export declare function authConnector(parameters: AuthParameters): import("@wagmi/core").CreateConnectorFn<W3mFrameProvider, {
    provider?: W3mFrameProvider | undefined;
}, Record<string, unknown>>;
export {};
