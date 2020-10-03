import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexLoginComponent } from './index-login/index-login.component';

const routes: Routes = [
  
  { path: 'login', component: IndexLoginComponent },
  { path: 'login/:passportHash', component: IndexLoginComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
