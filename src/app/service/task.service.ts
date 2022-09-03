import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Status } from '../enums/status.enum';
import { CustomResponse } from '../models/custom-response';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly apiUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  tasks$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/tasks/list`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  save$ = (task: Task) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/tasks/list`, task)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  filterByStatus$ = (status: Status, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      subscriber => {
        console.log(response);
        response.data.objList = response.data.objList as Task[];
        subscriber.next(
          {
            ...response,
            message: 'Tasks filtered by ${status} status',
            data: {
              objList: response.data.objList.filter((task): task is Task => {
                return (task as Task).status === status;
              })
            }
          }
        );
        subscriber.complete();
      }
    ).pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  filterByProject$ = (id: number, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      subscriber => {
        response.data.objList = response.data.objList as Task[];
        subscriber.next(
          {
            ...response,
            message: 'Tasks filtered by ${status} status',
            data: {
              objList: response.data.objList.filter(t => {
                return (t as Task).project.id === id;
              })
            }
          }
        );
        subscriber.complete();
      }
    ).pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  delete$ = (taskId: number) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>(`${this.apiUrl}/tasks/delete/${taskId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  search$ = (request: string) => {
    let body = new HttpParams();
    body = body.set('request', request);
    return <Observable<CustomResponse>>this.http.get<CustomResponse>(`${this.apiUrl}/tasks/search`, { params: body })
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  }

  handleError(err: any): Observable<never> {
    throw new Error('Method not implemented.');
  }

}
