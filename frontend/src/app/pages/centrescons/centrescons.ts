import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-centrescons',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './centrescons.html',
  styleUrl: './centrescons.scss',
})
export class Centrescons implements OnInit {
  // Le tableau qui va stocker les centres envoyés par Laravel
  listeDesCentres: any[] = [];

  // L'URL de ton API Laravel
  private apiUrl = 'http://127.0.0.1:8000/api/centres';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.chargerCentres();
  }

  chargerCentres(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Centres chargés avec succès :', data);
        this.listeDesCentres = data; // On remplit le tableau pour le HTML
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des centres :', err);
      },
    });
  }
}
