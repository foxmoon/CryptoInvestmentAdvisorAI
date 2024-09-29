import { LitElement } from 'lit';
export declare class W3mConnectView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private connectors;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private walletListTemplate;
    private onContinueWalletClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connect-view': W3mConnectView;
    }
}
