import { LitElement } from 'lit';
import { type SwapToken, type SwapInputTarget } from '@web3modal/core';
export declare class W3mSwapInput extends LitElement {
    static styles: import("lit").CSSResult[];
    focused: boolean;
    balance: string | undefined;
    value?: string;
    price: number;
    marketValue?: string;
    disabled?: boolean;
    target: SwapInputTarget;
    token?: SwapToken;
    onSetAmount: ((target: SwapInputTarget, value: string) => void) | null;
    onSetMaxValue: ((target: SwapInputTarget, balance: string | undefined) => void) | null;
    render(): import("lit").TemplateResult<1>;
    private handleKeydown;
    private dispatchInputChangeEvent;
    private setMaxValueToInput;
    private templateTokenSelectButton;
    private tokenBalanceTemplate;
    private tokenActionButtonTemplate;
    private onFocusChange;
    private onSelectToken;
    private onBuyToken;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-swap-input': W3mSwapInput;
    }
}
