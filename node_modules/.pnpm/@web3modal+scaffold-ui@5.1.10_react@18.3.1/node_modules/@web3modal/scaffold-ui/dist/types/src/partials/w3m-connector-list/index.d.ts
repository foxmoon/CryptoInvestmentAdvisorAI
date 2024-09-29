import { LitElement } from 'lit';
export declare class W3mConnectorList extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private connectors;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private getConnectorsByType;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connector-list': W3mConnectorList;
    }
}
