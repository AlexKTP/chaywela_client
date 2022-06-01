import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CustomReponse } from '../models/custom-reponse';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly apiUrl: any;

  constructor(private http: HttpClient) { }

  projects$ = <Observable<CustomReponse>>
    this.http.get<CustomReponse>('${this.apiUrl}/tasks/list')
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  save$ = (task: Task) => <Observable<CustomReponse>>
    this.http.post<CustomReponse>('${this.apiUrl}/tasks/list', task)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  delete$ = (taskId: number) => <Observable<CustomReponse>>
    this.http.delete<CustomReponse>('${this.apiUrl}/tasks/delete/${taskId}')
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  handleError(err: any): Observable<never> {
    throw new Error('Method not implemented.');
  }

}
