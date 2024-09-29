import { LitElement } from 'lit';
export declare class W3mSwapSelectTokenView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private interval?;
    private targetToken;
    private sourceToken;
    private sourceTokenAmount;
    private toToken;
    private myTokensWithBalance;
    private popularTokens;
    private searchValue;
    constructor();
    updated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private onSelectToken;
    private templateSearchInput;
    private templateTokens;
    private templateSuggestedTokens;
    private onSearchInputChange;
    private handleSuggestedTokensScroll;
    private handleTokenListScroll;
    private filterTokensWithText;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-swap-select-token-view': W3mSwapSelectTokenView;
    }
}
