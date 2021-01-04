import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NewISOComponent } from './components/new-iso/new-iso.component';
import { PreselectionComponent } from './components/preselection/preselection.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'iso', component: NewISOComponent },
  { path: 'preselection', component: PreselectionComponent },
];

/**
 * Ng module to define routes
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
