import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserInfo {
  id?: number;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  email: string;
  statut?: string;
  password?: string;
  password_confirmation?: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getProfile(): Observable<{ success: boolean; data: UserInfo }> {
    return this.http.get<{ success: boolean; data: UserInfo }>(
      this.apiUrl,
      { headers: this.getHeaders() }
    );
  }

  updateProfile(data: UserInfo): Observable<{ success: boolean; message: string; data: UserInfo }> {
    return this.http.put<{ success: boolean; message: string; data: UserInfo }>(
      this.apiUrl,
      data,
      { headers: this.getHeaders() }
    );
  }
}
