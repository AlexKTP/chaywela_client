import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from './enums/data-state.enum';
import { AppState } from './models/app-state';
import { CustomResponse } from './models/custom-response';
import { User } from './models/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  appState$!: Observable<AppState<CustomResponse>>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log("ngOnInit");

    this.appState$ = this.userService.users$
      .pipe(
        map(response => {
          console.log("on est en LOADED")
          return { dataState: DataState.LOADED_STATE, appData: response }
        }),
        startWith(
          { dataState: DataState.LOADING_DATE }
        ),
        catchError((err: string) => {
          console.log(err)
          return of({ dataState: DataState.ERROR_STATE, err })
        }
        ))


  }



  title = 'chaywela_front';
}
