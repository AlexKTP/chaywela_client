import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponse } from 'src/app/models/custom-response';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

}
