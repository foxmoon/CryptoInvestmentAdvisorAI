import { type AccountType } from '@web3modal/core';
import { LitElement } from 'lit';
export declare class W3mSwitchAddressView extends LitElement {
    static styles: import("lit").CSSResult;
    private readonly metadata;
    allAccounts: AccountType[];
    private balances;
    readonly labels: Map<string, string>;
    readonly currentAddress: string;
    private connectedConnector;
    private shouldShowIcon;
    private caipNetwork;
    constructor();
    connectedCallback(): void;
    getAddressIcon(type: AccountType['type']): "lightbulb" | "mail";
    render(): import("lit").TemplateResult<1>;
    private getAddressTemplate;
    private onSwitchAddress;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-switch-address-view': W3mSwitchAddressView;
    }
}
