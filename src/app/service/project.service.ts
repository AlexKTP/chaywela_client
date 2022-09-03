import { HttpClient, HttpParams } from '@angular/common/http';
import { partitionArray } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProjectType } from '../enums/project-type.enum';
import { CustomResponse } from '../models/custom-response';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly apiUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  projects$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/projects/list`)
      .pipe(
        tap({
          next: value => {
            console.log("on est dans tap de project service " + value);
          },
          error: error => console.log(error),
          complete: () => {
            console.log('Fetching project done!')
          }
        }),
        catchError(this.handleError)
      )

  save$ = (project: Project) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/projects/save`, project)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  delete$ = (projectId: number) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>(`${this.apiUrl}/projects/project/delete/${projectId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )


  filterByType$ = (type: ProjectType, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      subscriber => {
        console.log(response);
        response.data.objList = response.data.objList as Project[];
        subscriber.next(
          {
            ...response,
            message: 'Projects filtered by ${type} type',
            data: {
              objList: response.data.objList.filter((project): project is Project => {
                return (project as Project).projectType == type;
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

  filterByUser$ = (userId: number, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      subscriber => {
        console.log(response);
        response.data.objList = response.data.objList as Project[];
        subscriber.next(
          {
            ...response,
            message: 'Projects filtered by ${userId} type',
            data: {
              objList: response.data.objList.filter((project): project is Project => {
                return (project as Project).user.id == userId;
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

  search$ = (request: string) => {
    let body = new HttpParams();
    body = body.set('request', request);
    return <Observable<CustomResponse>>this.http.get<CustomResponse>(`${this.apiUrl}/projects/search`, { params: body })
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  }


  handleError(err: any): Observable<never> {
    console.log('voici erreur soulevee: ' + err)
    throw new Error('Method not implemented.');
  }

}
