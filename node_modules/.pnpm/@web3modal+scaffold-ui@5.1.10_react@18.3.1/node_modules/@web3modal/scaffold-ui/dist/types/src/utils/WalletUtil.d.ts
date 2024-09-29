import { type WcWallet } from '@web3modal/core';
export declare const WalletUtil: {
    filterOutDuplicatesByRDNS(wallets: WcWallet[]): WcWallet[];
    filterOutDuplicatesByIds(wallets: WcWallet[]): WcWallet[];
    filterOutDuplicateWallets(wallets: WcWallet[]): WcWallet[];
};
