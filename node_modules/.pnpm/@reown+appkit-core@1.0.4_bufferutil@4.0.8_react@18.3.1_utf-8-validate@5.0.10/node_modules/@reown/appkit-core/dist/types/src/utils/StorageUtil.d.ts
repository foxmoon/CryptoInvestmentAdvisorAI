import type { WcWallet, ConnectorType, SocialProvider } from './TypeUtil.js';
export declare const StorageUtil: {
    setWalletConnectDeepLink({ name, href }: {
        href: string;
        name: string;
    }): void;
    getWalletConnectDeepLink(): any;
    deleteWalletConnectDeepLink(): void;
    setAppKitRecent(wallet: WcWallet): void;
    getRecentWallets(): WcWallet[];
    setConnectedConnector(connectorType: ConnectorType): void;
    getConnectedConnector(): ConnectorType | undefined;
    setConnectedSocialProvider(socialProvider: SocialProvider): void;
    getConnectedSocialProvider(): string | undefined;
    getConnectedSocialUsername(): string | undefined;
    getStoredActiveCaipNetwork(): import("@reown/appkit-common").CaipNetwork | undefined;
};
