import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // 1. Import de HttpClient

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  isAgriculteur = false;

  // 2. Objet contenant toutes les données du formulaire
  userData = {
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    role: '',
    culture: '',
    password: '',
    password_confirmation: '', // Doit correspondre à la validation 'confirmed' de Laravel
  };

  // 3. Injection de HttpClient dans le constructeur
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  onRoleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.userData.role = select.value; // On stocke le rôle sélectionné
    this.isAgriculteur = select.value === 'agriculteur';

    if (!this.isAgriculteur) {
      this.userData.culture = ''; // Réinitialise si ce n'est plus un agriculteur
    }
  }

  onSubmit() {
    // URL de ton API Laravel (généralement sur le port 8000)
    const apiUrl = 'http://127.0.0.1:8000/api/register';

    console.log('Données envoyées :', this.userData);

    // 4. Envoi de la requête POST à Laravel
    this.http.post(apiUrl, this.userData).subscribe({
      next: (response: any) => {
        console.log('Inscription réussie !', response);
        alert('Compte créé avec succès !');
        this.router.navigate(['/login']); // Redirection vers la page de connexion
      },
      error: (error) => {
        console.error("Erreur lors de l'inscription", error);
        if (error.status === 422) {
          alert('Erreur de validation : ' + JSON.stringify(error.error.errors));
        } else {
          alert('Une erreur est survenue lors de la communication avec le serveur.');
        }
      },
    });
  }
}
