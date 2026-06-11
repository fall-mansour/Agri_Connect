import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.scss'
})
export class PasswordResetComponent {
  ancienMotDePasse = '';
  nouveauMotDePasse = '';
  confirmation = '';
  erreur = '';
  succes = false;

  constructor(private router: Router) {}

  onSubmit() {
    if (this.nouveauMotDePasse !== this.confirmation) {
      this.erreur = 'Les mots de passe ne correspondent pas.';
      return;
    }
    if (this.nouveauMotDePasse.length < 8) {
      this.erreur = 'Le mot de passe doit contenir au moins 8 caractères.';
      return;
    }
    this.erreur = '';
    this.succes = true;
    // TODO: connecter au backend Laravel
    setTimeout(() => this.router.navigate(['/login']), 2000);
  }
}
