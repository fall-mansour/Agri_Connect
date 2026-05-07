import { AgriculteursService } from '../agriculteurs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important pour le *ngFor
import { Agriculteur } from '../agriculteurs'; // Assure-toi que le chemin est correct

@Component({
  selector: 'app-acceuil',
  standalone: true, // Puisque tu utilises "imports: []", tu es probablement en mode Standalone
  imports: [CommonModule],
  templateUrl: './acceuil.html',
  styleUrl: './acceuil.scss',
})
export class Acceuil implements OnInit {
  // Tableau qui va stocker les données pour l'affichage
  listeDesAgriculteurs: Agriculteur[] = [];

  // Injection du service dans le constructeur
  constructor(private agriculteursService: AgriculteursService) {}

  ngOnInit(): void {
    // Appel de la méthode du service au chargement du composant
    this.chargerAgriculteurs();
  }

  chargerAgriculteurs(): void {
    this.listeDesAgriculteurs = this.agriculteursService.getAgriculteurs();
  }
}
