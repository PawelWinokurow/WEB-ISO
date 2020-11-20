import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NewISOComponent } from './components/new-iso/new-iso.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'iso', component: NewISOComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
