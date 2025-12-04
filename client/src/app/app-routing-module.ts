import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { AuthLayout } from './shared/layouts/auth-layout/auth-layout';
import { SiteLayout } from './shared/layouts/site-layout/site-layout';
import { RegisterPage } from './register-page/register-page';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '', component: AuthLayout,
    children: [
      {path: 'login', component: LoginPage},
      {path: 'register', component: RegisterPage}
    ]
  },
  {
    path: '', component: SiteLayout, children: [
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
