import { LitElement } from 'lit';
export declare class W3mWalletSendView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private token;
    private sendTokenAmount;
    private receiverAddress;
    private receiverProfileName;
    private loading;
    private gasPriceInUSD;
    private gasPrice;
    private message;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private fetchNetworkPrice;
    private onButtonClick;
    private getMessage;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-wallet-send-view': W3mWalletSendView;
    }
}
