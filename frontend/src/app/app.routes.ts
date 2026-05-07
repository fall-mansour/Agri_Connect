import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { Acceuil } from '../acceuil/acceuil';

export const routes: Routes = [
  { path: '',component: Acceuil},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];


export const routes: Routes = [{ path: '', component: Acceuil }];
