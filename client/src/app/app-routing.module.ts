import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { NewISOComponent } from './components/new-iso/new-iso.component';
import { PreselectionComponent } from './components/preselection/preselection.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'iso', component: NewISOComponent, canActivate: [AuthGuardService], data: {roles: ['USER', 'ADMIN']} },
  { path: 'preselection', component: PreselectionComponent, canActivate: [AuthGuardService], data: {roles: ['USER', 'ADMIN']} },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService], data: {roles: ['USER', 'ADMIN']} },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], data: {roles: ['ADMIN']} },
  { path: 'resetpassword', component: ResetPasswordComponent}
];

/**
 * Ng module to define routes
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
