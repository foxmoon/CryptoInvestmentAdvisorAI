import { LitElement } from 'lit';
import '../../components/wui-text/index.js';
import '../wui-logo/index.js';
import type { LogoType } from '../../utils/TypeUtil.js';
export declare class WuiListSocial extends LitElement {
    static styles: import("lit").CSSResult[];
    logo: LogoType;
    name: string;
    align: 'left' | 'center';
    disabled: boolean;
    render(): import("lit").TemplateResult<1>;
    private templatePlacement;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-list-social': WuiListSocial;
    }
}
