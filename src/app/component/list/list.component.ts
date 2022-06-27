import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormType } from 'src/app/enums/form-type.enum';
import { ProjectType } from 'src/app/enums/project-type.enum';
import { Status } from 'src/app/enums/status.enum';
import { CustomResponse } from 'src/app/models/custom-response';
import { Project } from 'src/app/models/project';
import { Task } from 'src/app/models/task';
import { ProjectService } from 'src/app/service/project.service';
import { TaskService } from 'src/app/service/task.service';

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
  @Input() type!: FormType;
  @Input() badge!: number;

  request!: string;
  projects: Project[] = [];
  projects$!: Observable<CustomResponse>;
  tasks!: Task[];
  tasks$!: Observable<CustomResponse>

  constructor(private projectService: ProjectService, private taskService: TaskService) { }

  ngOnInit(): void {

    switch (this.type) {
      case FormType.PROJECT:
        const project1: Project = { id: 1, name: "Tracking app", description: "A simple tracking app", projectType: ProjectType.PRIVATE, refUser: 1 };
        const project2: Project = { id: 2, name: "Blog", description: "A simple blog to document my IT journey", projectType: ProjectType.PRIVATE, refUser: 1 };
        this.projects.push(project1);
        this.projects.push(project2);
        break;
      case FormType.TASK:
        const task1: Task = { id: 1, title: "Create an http request with parameters", description: "an user could search a task or a project in the list by using the form request", status: Status.STARTED, duration: 0, difficulty: 2, progress: 0, estimatedTime: 60, project: 1 }
        this.tasks.push(task1);
        break;
    }
  }

  onSend(): void {
    console.log("voici le texte recupéré : " + this.request);
    this.projects$ = this.projectService.search$(this.request)
    this.projects$.subscribe({
      next: (value) => this.projects = value.data.objList as Project[],
      error: error => console.log(error),
      complete: () => {
        console.log('Fetching users done!')
      }
    }
    )
  }

}
