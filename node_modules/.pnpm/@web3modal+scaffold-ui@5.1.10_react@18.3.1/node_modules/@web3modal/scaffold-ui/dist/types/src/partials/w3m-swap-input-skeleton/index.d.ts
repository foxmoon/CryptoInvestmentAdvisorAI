import { LitElement } from 'lit';
import { type SwapInputTarget } from '@web3modal/core';
export declare class W3mSwapInputSkeleton extends LitElement {
    static styles: import("lit").CSSResult[];
    target: SwapInputTarget;
    render(): import("lit").TemplateResult<1>;
    private templateTokenSelectButton;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-swap-input-skeleton': W3mSwapInputSkeleton;
    }
}
