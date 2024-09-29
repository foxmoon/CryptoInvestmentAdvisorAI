import { type AccountType } from '@web3modal/core';
import { LitElement } from 'lit';
export declare class W3mSelectAddressesView extends LitElement {
    static styles: import("lit").CSSResult;
    private readonly metadata;
    allAccounts: AccountType[];
    private selectedAccounts;
    private selectAll;
    private approved;
    private isApproving;
    constructor();
    render(): import("lit").TemplateResult<1>;
    private getAddressTemplate;
    private onSelectAll;
    private onSelect;
    private handleClick;
    private onContinue;
    private onCancel;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-select-addresses-view': W3mSelectAddressesView;
    }
}
