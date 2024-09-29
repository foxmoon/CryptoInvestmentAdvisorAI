import { LitElement } from 'lit';
export declare class W3mAccountWalletFeaturesWidget extends LitElement {
    static styles: import("lit").CSSResult;
    private watchTokenBalance?;
    private unsubscribe;
    private address;
    private profileImage;
    private profileName;
    private smartAccountDeployed;
    private network;
    private currentTab;
    private tokenBalance;
    private preferredAccountType;
    constructor();
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private swapsTemplate;
    private watchSwapValues;
    private listContentTemplate;
    private tokenBalanceTemplate;
    private activateAccountTemplate;
    private onTabChange;
    private onProfileButtonClick;
    private onBuyClick;
    private onSwapClick;
    private onReceiveClick;
    private onSendClick;
    private onUpdateToSmartAccount;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-account-wallet-features-widget': W3mAccountWalletFeaturesWidget;
    }
}
