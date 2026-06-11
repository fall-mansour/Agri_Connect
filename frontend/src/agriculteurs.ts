import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CultureService {
  // L'URL de ton AccueilController Laravel
  private apiUrl = 'http://127.0.0.1:8000/api/cultures';

  constructor(private http: HttpClient) {}

  // On récupère le flux de données de l'API
  getCultures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
