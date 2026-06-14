import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AccueilComponent } from './pages/acceuil/acceuil';
import { PasswordResetComponent } from './pages/password-reset/password-reset';
import { UpdateInfo } from './pages/update-info/update-info';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'update-info', component: UpdateInfo },
  { path: '**', redirectTo: '' },
];