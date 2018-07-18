import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { VerifyComponent } from './verify/verify.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
// Import ParticlesModule
import { ParticlesModule } from 'angular-particle';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ParticlesModule,
    RouterModule.forChild([
      { path: 'sign-up', component: SignupComponent },
      { path: 'verify/:hash' , component: VerifyComponent},
      {path: 'reset/:id', component: ResetPasswordComponent},
    ])
  ],
  declarations: [LoginComponent, SignupComponent, VerifyComponent, ResetPasswordComponent]
})
export class UserModule { }
