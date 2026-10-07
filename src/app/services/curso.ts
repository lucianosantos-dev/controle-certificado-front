import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../model/Curso';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CursoService {

  private url = `${environment.apiUrl}/cursos`
  private http = inject(HttpClient);

  public getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url);
  }

}
