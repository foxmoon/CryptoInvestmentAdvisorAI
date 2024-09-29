import { LitElement } from 'lit';
export declare class WuiSwapDetails extends LitElement {
    static styles: import("lit").CSSResult[];
    private unsubscribe;
    networkName: string | undefined;
    detailsOpen: boolean;
    sourceToken: import("@web3modal/core").SwapTokenWithBalance | undefined;
    toToken: import("@web3modal/core").SwapTokenWithBalance | undefined;
    toTokenAmount: string;
    sourceTokenPriceInUSD: number;
    toTokenPriceInUSD: number;
    gasPriceInUSD: number | undefined;
    priceImpact: number | undefined;
    maxSlippage: number | undefined;
    networkTokenSymbol: string;
    inputError: string | undefined;
    constructor();
    render(): import("lit").TemplateResult<1> | null;
    private toggleDetails;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-w3m-details': WuiSwapDetails;
    }
}
