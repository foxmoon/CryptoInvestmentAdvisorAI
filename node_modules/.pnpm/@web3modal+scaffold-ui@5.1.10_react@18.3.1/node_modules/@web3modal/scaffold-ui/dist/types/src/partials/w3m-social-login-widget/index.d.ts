import { type SocialProvider } from '@web3modal/core';
import { LitElement } from 'lit';
export declare class W3mSocialLoginWidget extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private popupWindow?;
    private connectors;
    private connector;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    private topViewTemplate;
    private bottomViewTemplate;
    private separatorTemplate;
    onMoreSocialsClick(): void;
    onSocialClick(socialProvider?: SocialProvider): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-social-login-widget': W3mSocialLoginWidget;
    }
}
