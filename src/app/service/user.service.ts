import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CustomResponse } from '../models/custom-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: any;

  constructor(private http: HttpClient) { }

  users$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>('${this.apiUrl}/users/list')
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )


  save$ = (user: User) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>('${this.apiUrl}/users/save', user)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  delete$ = (userId: number) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>('${this.apiUrl}/users/delete/${userId}')
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  handleError(err: any): Observable<never> {
    throw new Error('Method not implemented.');
  }
}
