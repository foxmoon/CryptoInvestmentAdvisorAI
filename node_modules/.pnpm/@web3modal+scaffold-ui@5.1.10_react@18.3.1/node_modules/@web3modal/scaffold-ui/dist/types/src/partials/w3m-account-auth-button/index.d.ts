import { LitElement } from 'lit';
export declare class W3mAccountAuthButton extends LitElement {
    private socialProvider;
    private socialUsername;
    render(): import("lit").TemplateResult<1> | null;
    private onGoToUpdateEmail;
    private getAuthName;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-account-auth-button': W3mAccountAuthButton;
    }
}
