import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NewKEAComponent } from './components/new-kea/new-kea.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'kea', component: NewKEAComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
