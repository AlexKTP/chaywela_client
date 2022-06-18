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

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {

    const user1: User = { id: 1, username: 'James', bio: 'My name is Bond' };
    const user2: User = { id: 2, username: 'John', bio: 'Doe' };

    this.users.push(user1);
    this.users.push(user2);

    console.log(this.users)

    this.appState$ = this.userService.users$.pipe(
      tap({
        next: value => {
          console.log(value);
          // this.numberOfUsers = (value.data.objList as User[]).length > 0 ? (value.data.objList as User[]).length : 0;
          this.numberOfUsers = 1;
          const u = value.data.objList as User[];
          if (u !== null && u.length > 0) this.users = u;
        },
        error: error => console.log(error),
        complete: () => console.log("DONE!")
      })
    );

  }

}
