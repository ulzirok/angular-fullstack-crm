import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LoginPage } from './login-page/login-page';
import { AuthLayout } from './shared/layouts/auth-layout/auth-layout';
import { SiteLayout } from './shared/layouts/site-layout/site-layout';
import { RegisterPage } from './register-page/register-page';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { TokenInteceptor } from './shared/classes/token.interceptor';
import { OverviewPage } from './overview-page/overview-page';
import { AnalyticsPage } from './analytics-page/analytics-page';
import { HistoryPage } from './history-page/history-page';
import { OrderPage } from './order-page/order-page';
import { CategoriesPage } from './categories-page/categories-page';

@NgModule({
  declarations: [
    App,
    LoginPage,
    AuthLayout,
    SiteLayout,
    RegisterPage,
    OverviewPage,
    AnalyticsPage,
    HistoryPage,
    OrderPage,
    CategoriesPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInteceptor
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
