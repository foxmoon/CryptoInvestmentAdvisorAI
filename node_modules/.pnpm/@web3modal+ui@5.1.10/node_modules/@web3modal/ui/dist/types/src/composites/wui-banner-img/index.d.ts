import { LitElement } from 'lit';
import '../../components/wui-text/index.js';
import '../wui-icon-box/index.js';
export declare class WuiBannerImg extends LitElement {
    static styles: import("lit").CSSResult[];
    imageSrc: string;
    text: string;
    size: string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-banner-img': WuiBannerImg;
    }
}
