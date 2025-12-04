import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LoginPage } from './login-page/login-page';
import { AuthLayout } from './shared/layouts/auth-layout/auth-layout';
import { SiteLayout } from './shared/layouts/site-layout/site-layout';
import { RegisterPage } from './register-page/register-page';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    LoginPage,
    AuthLayout,
    SiteLayout,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
