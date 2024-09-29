import { LitElement } from 'lit';
export declare class W3mModal extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private abortController?;
    private open;
    private caipAddress;
    private isSiweEnabled;
    private connected;
    private loading;
    private shake;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    private onOverlayClick;
    private handleClose;
    private initializeTheming;
    private onClose;
    private onOpen;
    private onScrollLock;
    private onScrollUnlock;
    private onAddKeyboardListener;
    private onRemoveKeyboardListener;
    private onNewAddress;
    private onSiweNavigation;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-modal': W3mModal;
    }
}
