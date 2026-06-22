import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Solicitacao {
  private http = inject(HttpClient);
  private API = "http://localhost:8080/solicitacoes";

  public enviarSolicitacao(dadosSolicitacao: any): Observable<any> {
    return this.http.post(this.API, dadosSolicitacao);
  }

  public getSolicitacoes(): Observable<any> {
    return this.http.get(`${this.API}/minhas`);
  }

}
