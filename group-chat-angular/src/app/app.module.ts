import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// Import ParticlesModule
import { ParticlesModule } from 'angular-particle';

// routing
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { LoginComponent } from './user/login/login.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ChatModule,
    UserModule,
    HttpClientModule,
    ParticlesModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '*', component: LoginComponent },
      { path: '**', component: LoginComponent }
    ])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
