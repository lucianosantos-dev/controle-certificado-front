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

  public getAll(
    pagina: number,
    tamanho: number,
    nome: string = '',
    cpf: string = '',
    status: string = 'TODOS',
    filtroCurso: string = ''
  ): Observable<any> {

    let parametros = new HttpParams()
      .set('page', pagina.toString())
      .set('size', tamanho.toString());

    if (nome && nome.trim() !== '') {
      parametros = parametros.set('nome', nome.trim());
    }

    if (cpf && cpf.trim() !== '') {
      parametros = parametros.set('cpf', cpf.trim());
    }

    if (status && status !== 'TODOS') {
      parametros = parametros.set('status', status);
    }

    if (filtroCurso && String(filtroCurso).trim() !== '') {
      parametros = parametros.set('cursoId', String(filtroCurso).trim());
      parametros = parametros.set('filtroCurso', String(filtroCurso).trim());
    }

    return this.http.get<any>(this.API, { params: parametros });
  }

  public atualizarStatus(id: number, novoStatus: string): Observable<any> {
    return this.http.patch<any>(`${this.API}/${id}/status`, { status: novoStatus });
  }

  atualizarFinanceiro(id: number, financeiroOk: boolean): Observable<Solicitacao> {
  return this.http.patch<Solicitacao>(
    `${this.API}/${id}/financeiro`, 
    { financeiroOk: financeiroOk }
  );
}
}