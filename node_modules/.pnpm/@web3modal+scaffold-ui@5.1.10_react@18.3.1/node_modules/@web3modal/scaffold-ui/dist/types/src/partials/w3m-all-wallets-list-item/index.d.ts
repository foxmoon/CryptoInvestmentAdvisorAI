import { LitElement } from 'lit';
export declare class W3mAllWalletsListItem extends LitElement {
    static styles: import("lit").CSSResult;
    private observer;
    private visible;
    private imageSrc;
    private imageLoading;
    private wallet;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private imageTemplate;
    private shimmerTemplate;
    private fetchImageSrc;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-all-wallets-list-item': W3mAllWalletsListItem;
    }
}
