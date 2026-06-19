import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);

  private API = "http://localhost:8080/usuarios";
  private API_LOGIN = "http://localhost:8080/auth/login";

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
      })
    )
  }
}

