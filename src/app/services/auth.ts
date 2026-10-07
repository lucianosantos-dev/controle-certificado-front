import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private API = `${environment.apiUrl}/usuarios`
  private API_LOGIN = `${environment.apiUrl}/auth/login`;

  public cadastrarUsuario(dadosUsuario: any): Observable<any> {
    return this.http.post(this.API, dadosUsuario);
  }

  public login(dadosLogin: any): Observable<any> {
    return this.http.post<any>(this.API_LOGIN, dadosLogin).pipe(
      tap(response => {
        const token = response.token;

        localStorage.setItem('token', token);

        const payloadBase64Url = token.split('.')[1];

        const base64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');

        const payloadDecodificado = decodeURIComponent(
          atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join('')
        );

        const payloadJson = JSON.parse(payloadDecodificado);

        localStorage.setItem('perfil', payloadJson.perfil);
        localStorage.setItem('meuUsuario', payloadJson.nome);
      })
    );
  }

  public logout(): void {
    localStorage.clear();

    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getPerfil(): string | null {
    return localStorage.getItem('perfil');
  }

  public getNomeUsuario(): string | null {
    return localStorage.getItem('meuUsuario');
  }
}

