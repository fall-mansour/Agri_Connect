import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { PasswordResetComponent } from './pages/password-reset/password-reset';
import { Acceuil } from './pages/acceuil/acceuil';


export const routes: Routes = [
  {
    path: '',
    component: Acceuil,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: 'password-reset',
    component: PasswordResetComponent, 
  },
  // Optionnel : redirection si la page n'existe pas
  {
    path: '**',
    redirectTo: '',
  },
];
