import { LitElement } from 'lit';
export declare class W3mConnectRecommendedWidget extends LitElement {
    private unsubscribe;
    private connectors;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    private onConnectWallet;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connect-recommended-widget': W3mConnectRecommendedWidget;
    }
}
