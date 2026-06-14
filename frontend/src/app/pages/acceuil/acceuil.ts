// src/app/pages/accueil/accueil.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CultureService } from '../../../agriculteurs';
import { AuthService } from '../../../auth-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './acceuil.html',
  styleUrl: './acceuil.scss',
  imports: [CommonModule, FormsModule],
})
export class AccueilComponent implements OnInit {
  listeDesAgriculteurs: any[] = [];
  termeRecherche: string = '';

  // Variable observable qui contiendra l'utilisateur s'il est connecté
  currentUser$: Observable<any>;

  constructor(
    private cultureService: CultureService,
    private authService: AuthService, // <-- Injection ici
  ) {
    this.currentUser$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.cultureService.getCultures().subscribe({
      next: (data) => (this.listeDesAgriculteurs = data),
      error: (err) => console.error(err),
    });
  }

  get agriculteursFiltres(): any[] {
    if (!this.termeRecherche.trim()) return this.listeDesAgriculteurs;
    return this.listeDesAgriculteurs.filter(
      (agri) =>
        agri.description &&
        agri.description.toLowerCase().includes(this.termeRecherche.toLowerCase()),
    );
  }

  // Appel de la méthode de déconnexion
  onLogout(): void {
    this.authService.logout();
  }
}
