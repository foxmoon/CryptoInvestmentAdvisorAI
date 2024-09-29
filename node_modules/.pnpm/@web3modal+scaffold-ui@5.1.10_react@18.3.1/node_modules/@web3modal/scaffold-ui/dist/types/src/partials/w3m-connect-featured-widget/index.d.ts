import { LitElement } from 'lit';
export declare class W3mConnectFeaturedWidget extends LitElement {
    private unsubscribe;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    private onConnectWallet;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connect-featured-widget': W3mConnectFeaturedWidget;
    }
}
