import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Acceuil } from './pages/acceuil/acceuil';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Acceuil, LoginComponent, RegisterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
