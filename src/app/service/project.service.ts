import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
        tap(console.log),
        catchError(this.handleError)
      )

  save$ = (project: Project) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/projects/save`, project)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  delete$ = (projectId: number) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>(`${this.apiUrl}/projects/${projectId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )


  filter$ = (type: ProjectType, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      subscriber => {
        console.log(response);
        response.data.objList = response.data.objList as Project[];
        subscriber.next(
          {
            ...response,
            message: 'Projects filtered by ${type} type',
            data: {
              objList: response.data.objList.filter(
                project => project.projectType === type
              )
            }
          }
        );
        subscriber.complete();
      }
    ).pipe(
      tap(console.log),
      catchError(this.handleError)
    );


  handleError(err: any): Observable<never> {
    throw new Error('Method not implemented.');
  }

}
