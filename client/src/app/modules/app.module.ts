import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppComponent } from "../app.component";
import { AdminComponent } from "../components/admin/admin.component";
import { LoginComponent } from "../components/login/login.component";
import { MainComponent } from "../components/main/main.component";
import { NewISOComponent } from "../components/new-iso/new-iso.component";
import { PreselectionComponent } from "../components/preselection/preselection.component";
import { ResetPasswordComponent } from "../components/reset-password/reset-password.component";
import { SettingsComponent } from "../components/settings/settings.component";
import { DeleteAccountDialog } from "../dialogs/delete-account-dialog/delete-account.dialog";
import { NewAccountDialog } from "../dialogs/new-account-dialog/new-account.dialog";
import { ResetPasswordAdminDialog } from "../dialogs/reset-password-admin/reset-password-admin.dialog";
import { ResetPasswordUserDialog } from "../dialogs/reset-password-user/reset-password-user.dialog";
import { SendCustomerConfirmationDialog } from "../dialogs/send-customer-confirmation-dialog/send-customer-confirmation.dialog";
import { externalModules, services } from "./modules";
import { CustomersComponent } from '../components/customers/customers.component';


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
    CustomersComponent,
  ],
  imports: [
    ...externalModules,
  ],
  providers: [
    ...services
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule {}
