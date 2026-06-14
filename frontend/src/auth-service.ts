import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private userSubject: BehaviorSubject<any>;

  // On injecte PLATFORM_ID pour savoir si on est sur le serveur ou le navigateur
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // On initialise avec une valeur par défaut sécurisée
    let initialUser = null;

    // Si on est bien sur le navigateur, on a le droit de lire le localStorage
    if (isPlatformBrowser(this.platformId)) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        initialUser = JSON.parse(savedUser);
      }
    }

    this.userSubject = new BehaviorSubject<any>(initialUser);
  }

  get user$(): Observable<any> {
    return this.userSubject.asObservable();
  }

  // --- TRAITEMENT LOGIQUE DE LA CONNEXION ---
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response && response.user && isPlatformBrowser(this.platformId)) {
          // Sauvegarde locale uniquement sur le navigateur
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          // Mise à jour de l'état de l'application
          this.userSubject.next(response.user);

          // Redirection selon le statut renvoyé par Laravel
          this.redirigerSelonRole(response.user.role);
        }
      }),
    );
  }

  redirigerSelonRole(role: string): void {
    if (role === 'gestionnaire') {
      this.router.navigate(['/centres']); // Page d'accueil des stocks
    } else if (role === 'agriculteur' || role === 'acheteur') {
      this.router.navigate(['/accueil']); // Page d'accueil globale
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
