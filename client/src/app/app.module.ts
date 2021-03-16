import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSoapModule } from 'ngx-soap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { DictionaryService } from './services/dictionary.service';
import { HttpService } from './services/http.service';
import { ListService } from './services/list.service';
import { NewISOComponent } from './components/new-iso/new-iso.component';
import { ErrorMessageService } from './services/error-message.service';
import { StorageService } from './services/storage.service';
import { PreselectionComponent } from './components/preselection/preselection.component';
import { ToastrModule } from 'ngx-toastr';
import { SearchService } from './services/search.service';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { DateService } from './services/date.service';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { AccountService } from './services/account.service';
import { RecaptchaService } from './services/recaptcha.service';
import { CustomerService } from './services/customer.service';
import { ResetPasswordDialog } from './dialogs/reset-password/reset-password.dialog';
import { DeleteAccountDialog } from './dialogs/delete-account-dialog/delete-account.dialog';
import { EmailDialog } from './dialogs/email-dialog/email.dialog';
import { SendCustomerConfirmationDialog } from './dialogs/send-customer-confirmation-dialog/send-customer-confirmation.dialog';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NewAccountDialog } from './dialogs/new-account-dialog/new-account.dialog';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewISOComponent,
    SendCustomerConfirmationDialog,
    EmailDialog,
    PreselectionComponent,
    LoginComponent,
    SettingsComponent,
    AdminComponent,
    DeleteAccountDialog,
    ResetPasswordDialog,
    NewAccountDialog, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSoapModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
    RecaptchaModule,
    RecaptchaFormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    DictionaryService,
    HttpService, 
    ListService,
    ErrorMessageService,
    StorageService,
    SearchService,
    DateService,
    AuthService,
    AuthGuardService,
    AccountService,
    RecaptchaService,
    CustomerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule {}
