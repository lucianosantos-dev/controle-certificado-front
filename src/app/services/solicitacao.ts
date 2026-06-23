import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class Solicitacao {
  private http = inject(HttpClient);

  private API = `${environment.apiUrl}/solicitacoes`;

  public enviarSolicitacao(dadosSolicitacao: any): Observable<any> {
    return this.http.post(this.API, dadosSolicitacao);
  }

  public getSolicitacoes(): Observable<any> {
    return this.http.get(`${this.API}/minhas`);
  }

  public getAll(pagina: number, tamanho: number, nome: string = '', cpf: string = ''): Observable<any> {
    let parametros = new HttpParams()
      .set('page', pagina.toString())
      .set('size', tamanho.toString())
      .set('nome', nome || '');

    if (cpf && cpf.trim() !== '') {
      parametros = parametros.set('cpf', cpf);
    }
    return this.http.get<any>(this.API, { params: parametros });
  }

  public atualizarStatus(id: number, novoStatus: string): Observable<any> {
    return this.http.patch<any>(`${this.API}/${id}/status`, { status: novoStatus });
  }
}