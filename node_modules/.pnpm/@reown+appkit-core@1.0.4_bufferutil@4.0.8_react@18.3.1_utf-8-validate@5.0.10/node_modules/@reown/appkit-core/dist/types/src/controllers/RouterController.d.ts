import type { Connector, WcWallet } from '../utils/TypeUtil.js';
import type { SwapInputTarget } from './SwapController.js';
import type { CaipNetwork, ChainNamespace } from '@reown/appkit-common';
type TransactionAction = {
    /**
     * If true, the router will go back to the previous view after the transaction is complete..
     */
    goBack: boolean;
    /**
     * If set, the router will navigate to the specified view after the transaction is complete.
     */
    view: RouterControllerState['view'] | null;
    /**
     * If true, the router will remove the previous view from the history and navigate to the current view.
     */
    replace?: boolean;
    /**
     * Function to be called when the transaction is complete.
     */
    onSuccess?: () => void;
    /**
     * Function to be called when the transaction is cancelled.
     */
    onCancel?: () => void;
};
export interface RouterControllerState {
    view: 'Account' | 'AccountSettings' | 'SelectAddresses' | 'AllWallets' | 'ApproveTransaction' | 'BuyInProgress' | 'WalletCompatibleNetworks' | 'ChooseAccountName' | 'Connect' | 'ConnectingExternal' | 'ConnectingFarcaster' | 'ConnectingWalletConnect' | 'ConnectingSiwe' | 'ConnectingSocial' | 'ConnectSocials' | 'ConnectWallets' | 'Downloads' | 'EmailVerifyOtp' | 'EmailVerifyDevice' | 'GetWallet' | 'Networks' | 'OnRampActivity' | 'OnRampFiatSelect' | 'OnRampProviders' | 'OnRampTokenSelect' | 'Profile' | 'RegisterAccountName' | 'RegisterAccountNameSuccess' | 'SwitchNetwork' | 'SwitchAddress' | 'Transactions' | 'UnsupportedChain' | 'UpdateEmailWallet' | 'UpdateEmailPrimaryOtp' | 'UpdateEmailSecondaryOtp' | 'UpgradeEmailWallet' | 'UpgradeToSmartAccount' | 'WalletReceive' | 'WalletSend' | 'WalletSendPreview' | 'WalletSendSelectToken' | 'WhatIsANetwork' | 'WhatIsAWallet' | 'WhatIsABuy' | 'Swap' | 'SwapSelectToken' | 'SwapPreview' | 'ConnectingMultiChain' | 'SwitchActiveChain';
    history: RouterControllerState['view'][];
    data?: {
        connector?: Connector;
        wallet?: WcWallet;
        network?: CaipNetwork;
        email?: string;
        newEmail?: string;
        target?: SwapInputTarget;
        swapUnsupportedChain?: boolean;
        connectors?: Connector[];
        switchToChain?: ChainNamespace;
        navigateTo?: RouterControllerState['view'];
        navigateWithReplace?: boolean;
    };
    transactionStack: TransactionAction[];
}
export declare const RouterController: {
    state: RouterControllerState;
    subscribeKey<K extends keyof RouterControllerState>(key: K, callback: (value: RouterControllerState[K]) => void): () => void;
    pushTransactionStack(action: TransactionAction): void;
    popTransactionStack(cancel?: boolean): void;
    push(view: RouterControllerState['view'], data?: RouterControllerState['data']): void;
    reset(view: RouterControllerState['view']): void;
    replace(view: RouterControllerState['view'], data?: RouterControllerState['data']): void;
    goBack(): void;
    goBackToIndex(historyIndex: number): void;
};
export {};
