import { Component, Input, OnInit } from '@angular/core';
import { ProjectType } from 'src/app/enums/project-type.enum';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],

})
export class ListComponent implements OnInit {
  // <app-list [listData]='listData' >

  // @Input() listData: ;
  @Input() title!: string;
  // {title: , 
  // description: ,
  // type: ,
  // badge: }
  @Input() description!: string;
  @Input() type!: any;
  @Input() badge!: number;



  projects: Project[] = [];

  constructor() { }

  ngOnInit(): void {


    const project1: Project = { id: 1, name: "Tracking app", description: "A simple tracking app", projectType: ProjectType.PRIVATE, refUser: 1 };
    const project2: Project = { id: 2, name: "Blog", description: "A simple blog to document my IT journey", projectType: ProjectType.PRIVATE, refUser: 1 };

    this.projects.push(project1);
    this.projects.push(project2);


  }

}
