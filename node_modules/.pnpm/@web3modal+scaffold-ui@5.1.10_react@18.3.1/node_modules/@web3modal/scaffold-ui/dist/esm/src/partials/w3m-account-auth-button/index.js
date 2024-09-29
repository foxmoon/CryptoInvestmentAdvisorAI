var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { ConnectorController, RouterController, StorageUtil } from '@web3modal/core';
let W3mAccountAuthButton = class W3mAccountAuthButton extends LitElement {
    constructor() {
        super(...arguments);
        this.socialProvider = StorageUtil.getConnectedSocialProvider();
        this.socialUsername = StorageUtil.getConnectedSocialUsername();
    }
    render() {
        const type = StorageUtil.getConnectedConnector();
        const authConnector = ConnectorController.getAuthConnector();
        if (!authConnector || type !== 'AUTH') {
            this.style.cssText = `display: none`;
            return null;
        }
        const email = authConnector.provider.getEmail() ?? '';
        return html `
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon=${this.socialProvider ?? 'mail'}
        iconSize=${this.socialProvider ? 'xxl' : 'sm'}
        data-testid="w3m-account-email-update"
        ?chevron=${!this.socialProvider}
        @click=${() => {
            this.onGoToUpdateEmail(email, this.socialProvider);
        }}
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.getAuthName(email)}</wui-text>
      </wui-list-item>
    `;
    }
    onGoToUpdateEmail(email, socialProvider) {
        if (!socialProvider) {
            RouterController.push('UpdateEmailWallet', { email });
        }
    }
    getAuthName(email) {
        if (this.socialUsername) {
            if (this.socialProvider === 'discord' && this.socialUsername.endsWith('0')) {
                return this.socialUsername.slice(0, -1);
            }
            return this.socialUsername;
        }
        return email.length > 30 ? `${email.slice(0, -3)}...` : email;
    }
};
W3mAccountAuthButton = __decorate([
    customElement('w3m-account-auth-button')
], W3mAccountAuthButton);
export { W3mAccountAuthButton };
//# sourceMappingURL=index.js.map