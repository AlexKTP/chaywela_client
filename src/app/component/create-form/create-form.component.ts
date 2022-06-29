import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ListType } from 'src/app/enums/list-type.enum';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  @Input() type!: ListType;

  state$!: Observable<string>;

  public routeData: any;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log(">>>>>>>>> type: " + this.router.getCurrentNavigation()?.extras.state)
  }

}
