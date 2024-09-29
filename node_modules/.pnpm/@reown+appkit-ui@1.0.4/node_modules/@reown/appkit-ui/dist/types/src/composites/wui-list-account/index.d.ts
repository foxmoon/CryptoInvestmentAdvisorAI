import { LitElement } from 'lit';
import '../../components/wui-text/index.js';
import '../../components/wui-image/index.js';
import '../../layout/wui-flex/index.js';
export declare class WuiListAccount extends LitElement {
    static styles: import("lit").CSSResult[];
    accountAddress: string;
    accountType: string;
    private connectedConnector;
    private labels;
    private caipNetwork;
    private socialProvider;
    private balance;
    private fetchingBalance;
    private shouldShowIcon;
    selected: boolean;
    onSelect?: ({ address, type }: {
        address: string;
        type: string;
    }, selected: boolean) => void;
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private getLabel;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-list-account': WuiListAccount;
    }
}
