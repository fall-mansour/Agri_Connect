import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccueilComponent } from './pages/acceuil/acceuil';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { Centrescons } from './pages/centrescons/centrescons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AccueilComponent, LoginComponent, RegisterComponent, Centrescons],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}