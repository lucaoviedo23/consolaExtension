import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { LoginRoutingModule } from './login-routing.module';
import { IndexLoginComponent } from './index-login/index-login.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [IndexLoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
