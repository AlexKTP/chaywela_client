import { Component, OnInit } from '@angular/core';
import { ListType } from 'src/app/enums/list-type.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public listTypes = ListType;


  constructor() { }

  ngOnInit(): void {
  }

}
