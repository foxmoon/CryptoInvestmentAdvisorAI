import { LitElement } from 'lit';
import type { SocialProvider } from '@web3modal/scaffold-utils';
export declare class W3mSocialLoginList extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private popupWindow?;
    private connectors;
    private connector;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    onSocialClick(socialProvider?: SocialProvider): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-social-login-list': W3mSocialLoginList;
    }
}
