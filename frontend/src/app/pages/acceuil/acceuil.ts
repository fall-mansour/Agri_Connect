import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CultureService } from '../../../agriculteurs'; // Assure-toi que le chemin est correct

@Component({
  selector: 'app-accueil',
  templateUrl: './acceuil.html',
  styleUrl: './acceuil.scss',
  imports: [CommonModule],
})
export class AccueilComponent implements OnInit {
  // 1. On renomme la variable pour l'aligner avec le *ngFor du HTML
  listeDesAgriculteurs: any[] = [];

  constructor(private cultureService: CultureService) {}

  ngOnInit(): void {
    this.cultureService.getCultures().subscribe({
      next: (data) => {
        // 2. On alimente la bonne variable avec les données reçues de Laravel
        this.listeDesAgriculteurs = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des cultures', err);
      },
    });
  }
}
