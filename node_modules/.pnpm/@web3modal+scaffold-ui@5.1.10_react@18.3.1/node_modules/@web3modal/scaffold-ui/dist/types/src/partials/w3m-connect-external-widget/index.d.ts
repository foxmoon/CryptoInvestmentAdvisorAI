import { LitElement } from 'lit';
export declare class W3mConnectExternalWidget extends LitElement {
    private unsubscribe;
    private connectors;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    private onConnector;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connect-external-widget': W3mConnectExternalWidget;
    }
}
