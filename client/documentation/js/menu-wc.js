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
                                            'data-target="#components-links-module-AppModule-ef51f4fb661cfc9e2f760ea0d2c5d2fb"' : 'data-target="#xs-components-links-module-AppModule-ef51f4fb661cfc9e2f760ea0d2c5d2fb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ef51f4fb661cfc9e2f760ea0d2c5d2fb"' :
                                            'id="xs-components-links-module-AppModule-ef51f4fb661cfc9e2f760ea0d2c5d2fb"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmailDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmailDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
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
                                                <a href="components/SendCustomerConfirmationDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SendCustomerConfirmationDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-ef51f4fb661cfc9e2f760ea0d2c5d2fb"' : 'data-target="#xs-injectables-links-module-AppModule-ef51f4fb661cfc9e2f760ea0d2c5d2fb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ef51f4fb661cfc9e2f760ea0d2c5d2fb"' :
                                        'id="xs-injectables-links-module-AppModule-ef51f4fb661cfc9e2f760ea0d2c5d2fb"' }>
                                        <li class="link">
                                            <a href="injectables/DictionaryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DictionaryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ErrorMessageService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ErrorMessageService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HttpService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>HttpService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ListService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ListService</a>
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
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppDateAdapter.html" data-type="entity-link">AppDateAdapter</a>
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
                                    <a href="injectables/DictionaryService.html" data-type="entity-link">DictionaryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorMessageService.html" data-type="entity-link">ErrorMessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpService.html" data-type="entity-link">HttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListService.html" data-type="entity-link">ListService</a>
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
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CodeDetails.html" data-type="entity-link">CodeDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompanyCode.html" data-type="entity-link">CompanyCode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Country.html" data-type="entity-link">Country</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IndustryField.html" data-type="entity-link">IndustryField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IndustryFieldCode.html" data-type="entity-link">IndustryFieldCode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LegalForm.html" data-type="entity-link">LegalForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentTerm.html" data-type="entity-link">PaymentTerm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Salutation.html" data-type="entity-link">Salutation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SharedMask.html" data-type="entity-link">SharedMask</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SharedMask2.html" data-type="entity-link">SharedMask2</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Title.html" data-type="entity-link">Title</a>
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