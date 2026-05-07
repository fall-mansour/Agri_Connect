import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Acceuil } from '../acceuil/acceuil';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Acceuil],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend');
}
