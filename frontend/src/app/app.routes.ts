import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AccueilComponent } from './pages/acceuil/acceuil';
import { Centrescons } from './pages/centrescons/centrescons';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: 'accueil',
    component: AccueilComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'centres',
    component: Centrescons,
  },
  // Optionnel : redirection si la page n'existe pas
  {
    path: '**',
    redirectTo: '',
  },
];
