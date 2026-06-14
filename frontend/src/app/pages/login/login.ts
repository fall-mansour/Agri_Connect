import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // <-- Imports pour le formulaire
import { CommonModule } from '@angular/common'; // <-- Pour les *ngIf dans le HTML
import { AuthService } from '../../../auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule], // <-- Ajoute les modules ici
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  // Déclaration du groupe de formulaire
  loginForm: FormGroup;

  // Variable pour stocker un éventuel message d'erreur du backend
  errorMessage: string = '';

  // Variable pour afficher un spinner ou désactiver le bouton pendant le chargement
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    // Initialisation du formulaire avec des validations basiques
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    // Si le formulaire est invalide graphiquement, on s'arrête là
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Envoi des identifiants (email et password) au service d'authentification
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Connexion réussie !', response);
        // Note : La redirection automatique selon le rôle est déjà gérée à l'intérieur de l'AuthService !
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur de connexion', err);

        // On récupère le message d'erreur renvoyé par Laravel (ex: 401 "Email ou mot de passe incorrect")
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Une erreur est survenue lors de la connexion au serveur.';
        }
      },
    });
  }
}
