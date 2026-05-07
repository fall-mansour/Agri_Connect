
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  constructor(private router: Router) {}

  onSubmit() {
    // TODO: connecter au backend Laravel
    this.router.navigate(['/home']);
  }
}