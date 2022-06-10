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

  numberOfUsers: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.appState$ = this.userService.users$.pipe(
      tap({
        next: value => {
          console.log(value);
          // this.numberOfUsers = (value.data.objList as User[]).length > 0 ? (value.data.objList as User[]).length : 0;
          this.numberOfUsers = 1;
        },
        error: error => console.log(error),
        complete: () => console.log("DONE!")
      })
    );

  }

}
