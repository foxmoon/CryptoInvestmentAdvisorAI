var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import styles from './styles.js';
let W3mConnectSocialsView = class W3mConnectSocialsView extends LitElement {
    render() {
        return html `
      <wui-flex flexDirection="column" padding="s" gap="xs">
        <w3m-social-login-list></w3m-social-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
    }
};
W3mConnectSocialsView.styles = styles;
W3mConnectSocialsView = __decorate([
    customElement('w3m-connect-socials-view')
], W3mConnectSocialsView);
export { W3mConnectSocialsView };
//# sourceMappingURL=index.js.map