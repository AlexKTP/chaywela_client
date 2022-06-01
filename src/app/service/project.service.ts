import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CustomReponse } from '../models/custom-reponse';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly apiUrl: any;

  constructor(private http: HttpClient) { }

  projects$ = <Observable<CustomReponse>>
    this.http.get<CustomReponse>('${this.apiUrl}/projects/list')
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  save$ = (project: Project) => <Observable<CustomReponse>>
    this.http.post<CustomReponse>('${this.apiUrl}/projects/save', project)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  delete$ = (projectId: number) => <Observable<CustomReponse>>
    this.http.delete<CustomReponse>('${this.apiUrl}/projects/${projectId}')
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )


  handleError(err: any): Observable<never> {
    throw new Error('Method not implemented.');
  }

}
