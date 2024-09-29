import { LitElement } from 'lit';
export declare class W3mAccountSettingsView extends LitElement {
    private usubscribe;
    private readonly networkImages;
    private address;
    private profileImage;
    private profileName;
    private network;
    private preferredAccountType;
    private disconnecting;
    private loading;
    private switched;
    private text;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private chooseNameButtonTemplate;
    private authCardTemplate;
    private isAllowedNetworkSwitch;
    private onCopyAddress;
    private togglePreferredAccountBtnTemplate;
    private onChooseName;
    private changePreferredAccountType;
    private onNetworks;
    private onDisconnect;
    private onGoToUpgradeView;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-account-settings-view': W3mAccountSettingsView;
    }
}
