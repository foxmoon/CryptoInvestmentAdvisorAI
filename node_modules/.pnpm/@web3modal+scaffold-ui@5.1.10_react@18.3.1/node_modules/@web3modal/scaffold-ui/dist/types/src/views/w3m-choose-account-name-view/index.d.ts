import { LitElement } from 'lit';
export declare class W3mChooseAccountNameView extends LitElement {
    static styles: import("lit").CSSResult;
    private loading;
    render(): import("lit").TemplateResult<1>;
    private onboardingTemplate;
    private buttonsTemplate;
    private handleContinue;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-choose-account-name-view': W3mChooseAccountNameView;
    }
}
