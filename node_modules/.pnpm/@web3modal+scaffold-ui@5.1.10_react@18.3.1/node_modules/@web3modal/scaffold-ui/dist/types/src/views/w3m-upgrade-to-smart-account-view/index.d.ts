import { LitElement } from 'lit';
export declare class W3mUpgradeToSmartAccountView extends LitElement {
    private authConnector;
    private loading;
    render(): import("lit").TemplateResult<1>;
    private onboardingTemplate;
    private buttonsTemplate;
    private setPreferSmartAccount;
    private redirectToAccount;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-upgrade-to-smart-account-view': W3mUpgradeToSmartAccountView;
    }
}
