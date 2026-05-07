import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
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
  // Optionnel : redirection si la page n'existe pas
  {
    path: '**',
    redirectTo: '',
  },
];
