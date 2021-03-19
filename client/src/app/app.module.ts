import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NewISOComponent } from './components/new-iso/new-iso.component';
import { PreselectionComponent } from './components/preselection/preselection.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdminComponent } from './components/admin/admin.component';
import { DeleteAccountDialog } from './dialogs/delete-account-dialog/delete-account.dialog';
import { SendCustomerConfirmationDialog } from './dialogs/send-customer-confirmation-dialog/send-customer-confirmation.dialog';
import { NewAccountDialog } from './dialogs/new-account-dialog/new-account.dialog';
import { ResetPasswordAdminDialog } from './dialogs/reset-password-admin/reset-password-admin.dialog';
import { ResetPasswordUserDialog } from './dialogs/reset-password-user/reset-password-user.dialog';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { externalModules, serviceModules } from './modules/modules';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewISOComponent,
    SendCustomerConfirmationDialog,
    PreselectionComponent,
    LoginComponent,
    SettingsComponent,
    AdminComponent,
    DeleteAccountDialog,
    ResetPasswordUserDialog,
    ResetPasswordAdminDialog,
    NewAccountDialog,
    ResetPasswordComponent, 
  ],
  imports: [
    ...externalModules,
  ],
  providers: [
    ...serviceModules
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule {}
