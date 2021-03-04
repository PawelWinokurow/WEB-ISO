import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSoapModule } from 'ngx-soap';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { DictionaryService } from './services/dictionary.service';
import { HttpService } from './services/http.service';
import { SendMaskConfirmationDialogComponent } from './dialogs/send-mask-confirmation-dialog/send-mask-confirmation-dialog.component';
import { ListService } from './services/list.service';
import { EmailDialogComponent } from './dialogs/email-dialog/email-dialog.component';
import { NewISOComponent } from './components/new-iso/new-iso.component';
import { ErrorMessageService } from './services/error-message.service';
import { StorageService } from './services/storage.service';
import { PreselectionComponent } from './components/preselection/preselection.component';
import { ToastrModule } from 'ngx-toastr';
import { SearchService } from './services/search.service';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { DateService } from './services/date.service';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewISOComponent,
    SendMaskConfirmationDialogComponent,
    EmailDialogComponent,
    PreselectionComponent,
    LoginComponent,
    RegistrationComponent
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
  ],
  providers: [
    DictionaryService,
    HttpService, 
    ListService,
    ErrorMessageService,
    StorageService,
    SearchService,
    DateService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule {}
