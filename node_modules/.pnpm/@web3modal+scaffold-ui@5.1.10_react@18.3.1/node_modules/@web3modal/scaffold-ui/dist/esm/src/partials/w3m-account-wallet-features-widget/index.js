var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AccountController, ModalController, NetworkController, AssetUtil, RouterController, CoreHelperUtil, ConstantsUtil as CoreConstantsUtil, EventsController, OptionsController } from '@web3modal/core';
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './styles.js';
import { ConstantsUtil } from '../../utils/ConstantsUtil.js';
import { W3mFrameRpcConstants } from '@web3modal/wallet';
const TABS = 3;
const TABS_PADDING = 48;
const MODAL_MOBILE_VIEW_PX = 430;
let W3mAccountWalletFeaturesWidget = class W3mAccountWalletFeaturesWidget extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.address = AccountController.state.address;
        this.profileImage = AccountController.state.profileImage;
        this.profileName = AccountController.state.profileName;
        this.smartAccountDeployed = AccountController.state.smartAccountDeployed;
        this.network = NetworkController.state.caipNetwork;
        this.currentTab = AccountController.state.currentTab;
        this.tokenBalance = AccountController.state.tokenBalance;
        this.preferredAccountType = AccountController.state.preferredAccountType;
        this.unsubscribe.push(...[
            AccountController.subscribe(val => {
                if (val.address) {
                    this.address = val.address;
                    this.profileImage = val.profileImage;
                    this.profileName = val.profileName;
                    this.currentTab = val.currentTab;
                    this.tokenBalance = val.tokenBalance;
                    this.smartAccountDeployed = val.smartAccountDeployed;
                    this.preferredAccountType = val.preferredAccountType;
                }
                else {
                    ModalController.close();
                }
            })
        ], NetworkController.subscribeKey('caipNetwork', val => {
            this.network = val;
        }));
        this.watchSwapValues();
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        clearInterval(this.watchTokenBalance);
    }
    firstUpdated() {
        AccountController.fetchTokenBalance();
    }
    render() {
        if (!this.address) {
            throw new Error('w3m-account-view: No account provided');
        }
        const networkImage = AssetUtil.getNetworkImage(this.network);
        return html `<wui-flex
      flexDirection="column"
      .padding=${['0', 'xl', 'm', 'xl']}
      alignItems="center"
      gap="m"
    >
      ${this.network && html `<wui-network-icon .network=${this.network}></wui-network-icon>`}
      ${this.activateAccountTemplate()}
      <wui-profile-button
        @click=${this.onProfileButtonClick.bind(this)}
        address=${ifDefined(this.address)}
        networkSrc=${ifDefined(networkImage)}
        icon="chevronBottom"
        avatarSrc=${ifDefined(this.profileImage ? this.profileImage : undefined)}
        profileName=${this.profileName}
        data-testid="w3m-profile-button"
      ></wui-profile-button>
      ${this.tokenBalanceTemplate()}
      <wui-flex gap="s">
        <w3m-tooltip-trigger text="Buy">
          <wui-icon-button
            data-testid="wallet-features-onramp-button"
            @click=${this.onBuyClick.bind(this)}
            icon="card"
          ></wui-icon-button>
        </w3m-tooltip-trigger>
        ${this.swapsTemplate()}
        <w3m-tooltip-trigger text="Receive">
          <wui-icon-button
            data-testid="wallet-features-receive-button"
            @click=${this.onReceiveClick.bind(this)}
            icon="arrowBottomCircle"
          >
          </wui-icon-button>
        </w3m-tooltip-trigger>
        <w3m-tooltip-trigger text="Send">
          <wui-icon-button
            data-testid="wallet-features-send-button"
            @click=${this.onSendClick.bind(this)}
            icon="send"
          ></wui-icon-button>
        </w3m-tooltip-trigger>
      </wui-flex>

      <wui-tabs
        .onTabChange=${this.onTabChange.bind(this)}
        .activeTab=${this.currentTab}
        localTabWidth=${CoreHelperUtil.isMobile() && window.innerWidth < MODAL_MOBILE_VIEW_PX
            ? `${(window.innerWidth - TABS_PADDING) / TABS}px`
            : '104px'}
        .tabs=${ConstantsUtil.ACCOUNT_TABS}
      ></wui-tabs>
      ${this.listContentTemplate()}
    </wui-flex>`;
    }
    swapsTemplate() {
        const { enableSwaps } = OptionsController.state;
        if (!enableSwaps) {
            return null;
        }
        return html `
      <w3m-tooltip-trigger text="Swap">
        <wui-icon-button
          data-testid="wallet-features-swap-button"
          @click=${this.onSwapClick.bind(this)}
          icon="recycleHorizontal"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `;
    }
    watchSwapValues() {
        this.watchTokenBalance = setInterval(() => AccountController.fetchTokenBalance(), 10000);
    }
    listContentTemplate() {
        if (this.currentTab === 0) {
            return html `<w3m-account-tokens-widget></w3m-account-tokens-widget>`;
        }
        if (this.currentTab === 1) {
            return html `<w3m-account-nfts-widget></w3m-account-nfts-widget>`;
        }
        if (this.currentTab === 2) {
            return html `<w3m-account-activity-widget></w3m-account-activity-widget>`;
        }
        return html `<w3m-account-tokens-widget></w3m-account-tokens-widget>`;
    }
    tokenBalanceTemplate() {
        if (this.tokenBalance && this.tokenBalance?.length >= 0) {
            const value = CoreHelperUtil.calculateBalance(this.tokenBalance);
            const { dollars = '0', pennies = '00' } = CoreHelperUtil.formatTokenBalance(value);
            return html `<wui-balance dollars=${dollars} pennies=${pennies}></wui-balance>`;
        }
        return html `<wui-balance dollars="0" pennies="00"></wui-balance>`;
    }
    activateAccountTemplate() {
        const smartAccountEnabled = NetworkController.checkIfSmartAccountEnabled();
        if (!smartAccountEnabled ||
            this.preferredAccountType !== W3mFrameRpcConstants.ACCOUNT_TYPES.EOA ||
            this.smartAccountDeployed) {
            return null;
        }
        return html ` <wui-promo
      text=${'Activate your account'}
      @click=${this.onUpdateToSmartAccount.bind(this)}
      data-testid="activate-smart-account-promo"
    ></wui-promo>`;
    }
    onTabChange(index) {
        AccountController.setCurrentTab(index);
    }
    onProfileButtonClick() {
        RouterController.push('Profile');
    }
    onBuyClick() {
        RouterController.push('OnRampProviders');
    }
    onSwapClick() {
        if (this.network?.id && !CoreConstantsUtil.SWAP_SUPPORTED_NETWORKS.includes(this.network?.id)) {
            RouterController.push('UnsupportedChain', {
                swapUnsupportedChain: true
            });
        }
        else {
            EventsController.sendEvent({
                type: 'track',
                event: 'OPEN_SWAP',
                properties: {
                    network: this.network?.id || '',
                    isSmartAccount: AccountController.state.preferredAccountType ===
                        W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
                }
            });
            RouterController.push('Swap');
        }
    }
    onReceiveClick() {
        RouterController.push('WalletReceive');
    }
    onSendClick() {
        EventsController.sendEvent({
            type: 'track',
            event: 'OPEN_SEND',
            properties: {
                network: this.network?.id || '',
                isSmartAccount: AccountController.state.preferredAccountType ===
                    W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
            }
        });
        RouterController.push('WalletSend');
    }
    onUpdateToSmartAccount() {
        RouterController.push('UpgradeToSmartAccount');
    }
};
W3mAccountWalletFeaturesWidget.styles = styles;
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "watchTokenBalance", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "address", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "profileImage", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "profileName", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "smartAccountDeployed", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "network", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "currentTab", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "tokenBalance", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "preferredAccountType", void 0);
W3mAccountWalletFeaturesWidget = __decorate([
    customElement('w3m-account-wallet-features-widget')
], W3mAccountWalletFeaturesWidget);
export { W3mAccountWalletFeaturesWidget };
//# sourceMappingURL=index.js.map