export const SafeLocalStorageKeys = {
    WALLET_ID: '@appkit/wallet_id',
    WALLET_NAME: '@appkit/wallet_name',
    SOLANA_WALLET: '@appkit/solana_wallet',
    SOLANA_CAIP_CHAIN: '@appkit/solana_caip_chain',
    ACTIVE_CAIP_NETWORK_ID: '@appkit/active_caip_network_id',
    CONNECTED_CONNECTOR: '@appkit/connected_connector',
    CONNECTED_SOCIAL: '@appkit/connected_social',
    CONNECTED_SOCIAL_USERNAME: '@appkit/connected_social_username',
    RECENT_WALLETS: '@appkit/recent_wallets',
    DEEPLINK_CHOICE: 'WALLETCONNECT_DEEPLINK_CHOICE'
};
export const SafeLocalStorage = {
    setItem(key, value) {
        if (isSafe()) {
            localStorage.setItem(key, value);
        }
    },
    getItem(key) {
        if (isSafe()) {
            return localStorage.getItem(key) || undefined;
        }
        return undefined;
    },
    removeItem(key) {
        if (isSafe()) {
            localStorage.removeItem(key);
        }
    },
    clear() {
        if (isSafe()) {
            localStorage.clear();
        }
    }
};
function isSafe() {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}
//# sourceMappingURL=SafeLocalStorage.js.map