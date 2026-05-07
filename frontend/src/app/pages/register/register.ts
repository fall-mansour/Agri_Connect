import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  isAgriculteur = false;

  constructor(private router: Router) {}

  onRoleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.isAgriculteur = select.value === 'agriculteur';
  }

  onSubmit() {
    // TODO: connecter au backend Laravel
    this.router.navigate(['/login']);
  }
}