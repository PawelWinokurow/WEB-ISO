import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NewISOComponent } from './components/new-iso/new-iso.component';
import { PreselectionComponent } from './components/preselection/preselection.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  //{ path: '', component: MainComponent },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'iso', component: NewISOComponent },
  { path: 'preselection', component: PreselectionComponent },
  { path: 'settings', component: SettingsComponent },
];

/**
 * Ng module to define routes
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
