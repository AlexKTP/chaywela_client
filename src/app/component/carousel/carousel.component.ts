import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CustomResponse } from 'src/app/models/custom-response';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  appState$!: Observable<CustomResponse>;

  numberOfUsers!: number;

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {

    this.appState$ = this.userService.users$.pipe(
      tap({
        next: value => {
          console.log("on est dans le pipe du carousel " + value);
          this.users = (value.data.objList) as User[]
          this.numberOfUsers = this.users != undefined ? this.users.length : 0;
        },
        error: error => console.log(error),
        complete: () => {
          console.log('Fetching users done!')
        }
      })
    );

    this.appState$.subscribe(
      {
        complete: () => {
          for (let u in this.users) {
            console.log('user: ' + u)
          }
        }
      }
    );

  }

}
