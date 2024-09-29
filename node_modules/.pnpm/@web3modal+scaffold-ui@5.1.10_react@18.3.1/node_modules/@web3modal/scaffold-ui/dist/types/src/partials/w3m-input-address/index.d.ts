import { LitElement } from 'lit';
import type { Ref } from 'lit/directives/ref.js';
export declare class W3mInputAddress extends LitElement {
    static styles: import("lit").CSSResult;
    inputElementRef: Ref<HTMLInputElement>;
    instructionElementRef: Ref<HTMLElement>;
    value?: string;
    private instructionHidden;
    private pasting;
    protected firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private focusInput;
    private focusInstruction;
    private toggleInstructionFocus;
    private onBoxClick;
    private onBlur;
    private checkHidden;
    private onPasteClick;
    private onInputChange;
    private onDebouncedSearch;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-input-address': W3mInputAddress;
    }
}
