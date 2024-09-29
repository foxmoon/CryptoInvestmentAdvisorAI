export type SafeLocalStorageItems = {
    '@appkit/wallet_id': string;
    '@appkit/wallet_name': string;
    '@appkit/solana_wallet': string;
    '@appkit/solana_caip_chain': string;
    '@appkit/active_caip_network_id': string;
    '@appkit/connected_connector': string;
    '@appkit/connected_social': string;
    '@appkit/connected_social_username': string;
    '@appkit/recent_wallets': string;
    WALLETCONNECT_DEEPLINK_CHOICE: string;
};
export declare const SafeLocalStorageKeys: {
    readonly WALLET_ID: "@appkit/wallet_id";
    readonly WALLET_NAME: "@appkit/wallet_name";
    readonly SOLANA_WALLET: "@appkit/solana_wallet";
    readonly SOLANA_CAIP_CHAIN: "@appkit/solana_caip_chain";
    readonly ACTIVE_CAIP_NETWORK_ID: "@appkit/active_caip_network_id";
    readonly CONNECTED_CONNECTOR: "@appkit/connected_connector";
    readonly CONNECTED_SOCIAL: "@appkit/connected_social";
    readonly CONNECTED_SOCIAL_USERNAME: "@appkit/connected_social_username";
    readonly RECENT_WALLETS: "@appkit/recent_wallets";
    readonly DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE";
};
export declare const SafeLocalStorage: {
    setItem<Key extends keyof SafeLocalStorageItems>(key: Key, value: SafeLocalStorageItems[Key]): void;
    getItem<Key_1 extends keyof SafeLocalStorageItems>(key: Key_1): SafeLocalStorageItems[Key_1] | undefined;
    removeItem<Key_2 extends keyof SafeLocalStorageItems>(key: Key_2): void;
    clear(): void;
};
