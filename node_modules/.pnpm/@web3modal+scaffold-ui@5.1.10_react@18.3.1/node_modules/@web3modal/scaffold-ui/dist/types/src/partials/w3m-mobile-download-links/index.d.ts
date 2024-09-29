import type { WcWallet } from '@web3modal/core';
import { LitElement } from 'lit';
export declare class W3mMobileDownloadLinks extends LitElement {
    static styles: import("lit").CSSResult[];
    wallet?: WcWallet;
    render(): import("lit").TemplateResult<1> | null;
    private onAppStore;
    private onPlayStore;
    private onHomePage;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-mobile-download-links': W3mMobileDownloadLinks;
    }
}
