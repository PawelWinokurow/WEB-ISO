import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSoapModule } from 'ngx-soap';
import { SOAPService } from './services/soap.service';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { DictionaryService } from './services/dictionary.service';
import { HttpService } from './services/http.service';
import { SendMaskConfirmationDialogComponent } from './dialogs/send-direct-mask-dialog/send-direct-mask-dialog.component';
import { ListService } from './services/list.service';
import { PreselectionDialogComponent } from './dialogs/preselection-dialog/preselection-dialog.component';
import { EmailDialogComponent } from './dialogs/email-dialog/email-dialog.component';
import { NewISOComponent } from './components/new-iso/new-iso.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewISOComponent,
    SendMaskConfirmationDialogComponent,
    EmailDialogComponent,
    PreselectionDialogComponent,
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
  ],
  providers: [
    SOAPService, 
    DictionaryService,
    HttpService, 
    ListService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule {}
