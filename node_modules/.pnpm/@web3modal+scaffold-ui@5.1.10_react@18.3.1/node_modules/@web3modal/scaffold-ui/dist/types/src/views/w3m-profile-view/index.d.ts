import { LitElement } from 'lit';
export declare class W3mProfileView extends LitElement {
    static styles: import("lit").CSSResult;
    private usubscribe;
    private address;
    private profileImage;
    private profileName;
    private accounts;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private accountsTemplate;
    private onSwitchAccount;
    private accountTemplate;
    private onCopyAddress;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-profile-view': W3mProfileView;
    }
}
