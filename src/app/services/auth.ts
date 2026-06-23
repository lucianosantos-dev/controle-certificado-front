import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);

  private API = `${environment.apiUrl}/usuarios`
  private API_LOGIN = `${environment.apiUrl}/auth/login`;

  public cadastrarUsuario(dadosUsuario: any): Observable<any> {
    return this.http.post(this.API, dadosUsuario);
  }

  public login(dadosLogin: any): Observable<any> {
    return this.http.post<any>(this.API_LOGIN, dadosLogin).pipe(
      tap(response => {
        const token = response.token;

        localStorage.setItem('token', token)

        const payloadBase64 = token.split('.')[1];
        const payloadDecodificado = atob(payloadBase64);
        const payloadJson = JSON.parse(payloadDecodificado);

        localStorage.setItem('perfil', payloadJson.perfil);
        localStorage.setItem('meuUsuario', payloadJson.nome);
      })
    );
  }
}

