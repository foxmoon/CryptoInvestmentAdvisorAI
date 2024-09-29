import { LitElement } from 'lit';
export declare class W3mEmailVerifyDeviceView extends LitElement {
    static styles: import("lit").CSSResult;
    protected readonly email: string | undefined;
    protected readonly authConnector: import("@web3modal/core").AuthConnector | undefined;
    constructor();
    private loading;
    render(): import("lit").TemplateResult<1>;
    private listenForDeviceApproval;
    private onResendCode;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-email-verify-device-view': W3mEmailVerifyDeviceView;
    }
}
