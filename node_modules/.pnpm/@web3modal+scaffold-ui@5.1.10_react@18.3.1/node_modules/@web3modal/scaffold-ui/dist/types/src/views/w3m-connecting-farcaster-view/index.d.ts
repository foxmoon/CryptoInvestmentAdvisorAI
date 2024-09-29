import { LitElement } from 'lit';
export declare class W3mConnectingFarcasterView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    protected timeout?: ReturnType<typeof setTimeout>;
    private socialProvider;
    protected uri: string | undefined;
    protected ready: boolean;
    protected loading: boolean;
    authConnector: import("@web3modal/core").AuthConnector | undefined;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private platformTemplate;
    private desktopTemplate;
    private qrTemplate;
    private loadingTemplate;
    private mobileTemplate;
    private loaderTemplate;
    private connectFarcaster;
    private mobileLinkTemplate;
    private onRenderProxy;
    private qrCodeTemplate;
    private copyTemplate;
    private forceUpdate;
    protected onCopyUri(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connecting-farcaster-view': W3mConnectingFarcasterView;
    }
}
