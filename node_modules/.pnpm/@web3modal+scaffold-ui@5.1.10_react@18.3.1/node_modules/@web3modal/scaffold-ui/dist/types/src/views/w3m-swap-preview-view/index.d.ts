import { LitElement } from 'lit';
export declare class W3mSwapPreviewView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private interval?;
    private detailsOpen;
    private approvalTransaction;
    private swapTransaction;
    private sourceToken;
    private sourceTokenAmount;
    private sourceTokenPriceInUSD;
    private toToken;
    private toTokenAmount;
    private toTokenPriceInUSD;
    private caipNetwork;
    private balanceSymbol;
    private gasPriceInUSD;
    private inputError;
    private loadingQuote;
    private loadingApprovalTransaction;
    private loadingBuildTransaction;
    private loadingTransaction;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private refreshTransaction;
    private templateSwap;
    private templateDetails;
    private actionButtonLabel;
    private onCancelTransaction;
    private onSendTransaction;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-swap-preview-view': W3mSwapPreviewView;
    }
}
