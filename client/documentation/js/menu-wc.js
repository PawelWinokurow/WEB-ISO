'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">client documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AngularMaterialModule.html" data-type="entity-link">AngularMaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-38e0e7393fdce79cb6e7dc7d85e74ee4"' : 'data-target="#xs-components-links-module-AppModule-38e0e7393fdce79cb6e7dc7d85e74ee4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-38e0e7393fdce79cb6e7dc7d85e74ee4"' :
                                            'id="xs-components-links-module-AppModule-38e0e7393fdce79cb6e7dc7d85e74ee4"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CustomersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteAccountDialog.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeleteAccountDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditAccountDialog.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditAccountDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewAccountDialog.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewAccountDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewISOComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewISOComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PreselectionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PreselectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordAdminDialog.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPasswordAdminDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordUserDialog.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPasswordUserDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SendCustomerConfirmationDialog.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SendCustomerConfirmationDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-38e0e7393fdce79cb6e7dc7d85e74ee4"' : 'data-target="#xs-injectables-links-module-AppModule-38e0e7393fdce79cb6e7dc7d85e74ee4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-38e0e7393fdce79cb6e7dc7d85e74ee4"' :
                                        'id="xs-injectables-links-module-AppModule-38e0e7393fdce79cb6e7dc7d85e74ee4"' }>
                                        <li class="link">
                                            <a href="injectables/AccountService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AccountService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CustomerService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CustomerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DateService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DateService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DictionaryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DictionaryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ErrorMessageService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ErrorMessageService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FormValidationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FormValidationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HttpService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>HttpService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JSONValidationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JSONValidationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ListService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ListService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RecaptchaService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RecaptchaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SearchService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SearchService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StorageService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>StorageService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccountService.html" data-type="entity-link">AccountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppDateAdapter.html" data-type="entity-link">AppDateAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerService.html" data-type="entity-link">CustomerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DateService.html" data-type="entity-link">DateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DictionaryService.html" data-type="entity-link">DictionaryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorMessageService.html" data-type="entity-link">ErrorMessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormValidationService.html" data-type="entity-link">FormValidationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpService.html" data-type="entity-link">HttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JSONValidationService.html" data-type="entity-link">JSONValidationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListService.html" data-type="entity-link">ListService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecaptchaService.html" data-type="entity-link">RecaptchaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchService.html" data-type="entity-link">SearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link">StorageService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link">AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Account.html" data-type="entity-link">Account</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountDTO.html" data-type="entity-link">AccountDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountJWT.html" data-type="entity-link">AccountJWT</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Array.html" data-type="entity-link">Array</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CodeDetails.html" data-type="entity-link">CodeDetails</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});