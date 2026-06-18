import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);

  private API = "http://localhost:8080/usuarios";

  public cadastrarUsuario(dadosUsuario: any): Observable<any> {
    return this.http.post(this.API, dadosUsuario);
  }
}

