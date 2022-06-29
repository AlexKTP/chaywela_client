import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListType } from 'src/app/enums/list-type.enum';
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

  @Input() title!: string;
  @Input() description!: string;
  @Input() badge!: number;
  request!: string;
  projects: Project[] = [];
  projectsNonFiltered: Project[] = [];
  projects$!: Observable<CustomResponse>;
  tasks: Task[] = [];
  tasksNonFiltered: Task[] = [];
  tasks$!: Observable<CustomResponse>
  types = ListType;
  statusType = Status;
  idUser!: number;
  idProject!: number;


  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.idUser = params['idUser'] as number;
      console.log(this.idUser)
      this.idProject = params['idProject'] as number;
    });

    console.log(this.router.url)

    switch (this.router.url.split('/').pop()) {

      case 'projects':
        console.log("on ajoute les projects");
        const project1: Project = { id: 1, name: "Tracking app", description: "A simple tracking app", projectType: ProjectType.PRIVATE, refUser: 1 };
        const project2: Project = { id: 2, name: "Blog", description: "A simple blog to document my IT journey", projectType: ProjectType.PRIVATE, refUser: 2 };
        this.projectsNonFiltered.push(project1);
        this.projectsNonFiltered.push(project2);
        break
      case 'tasks':
        console.log("on ajoute les taches");
        const task1: Task = { id: 1, title: "Create an http request with parameters", description: "an user could search a task or a project in the list by using the form request", status: Status.PAUSED, duration: 0, difficulty: 2, progress: 0, estimatedTime: 60, project: 1 };
        const task2: Task = { id: 2, title: "Handling http parameters - Backend", description: "an user could search a task or a project in the list by using the form request", status: Status.FINISHED, duration: 0, difficulty: 2, progress: 0, estimatedTime: 90, project: 2 };
        this.tasksNonFiltered.push(task1);
        this.tasksNonFiltered.push(task2);
        break;
    }




    if (this.idProject != undefined && this.tasksNonFiltered.length > 0) {
      console.log("voici l'id project :" + this.idProject)
      this.tasks = this.tasksNonFiltered.filter((task) => {
        return task.project == this.idProject;
      });

      console.log(this.projects)

    } else if (this.tasksNonFiltered.length > 0) {
      this.tasks = this.tasksNonFiltered;
    }


    if (this.idUser != undefined && this.projectsNonFiltered.length > 0) {
      this.projects = this.projectsNonFiltered.filter((project) => {
        return project.refUser == this.idUser;
      });

      console.log(this.projects)

    } else if (this.projectsNonFiltered.length > 0) {
      this.projects = this.projectsNonFiltered;
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

  isFinished(status: Status): Object {

    let result: Object = {};

    if (status === Status.FINISHED) {
      result = {
        color: 'grey', 'text-decoration': 'line-through'
      };
    }
    return result;

  }


  onStyleTask(status: Status): Object {
    let result: Object;
    switch (status) {
      case Status.STARTED:
        result = { color: 'green' };
        break;
      case Status.PAUSED:
        result = { color: 'grey' };
        break;
      case Status.CANCELED:
        result = { color: 'orange' };
        break;
      case Status.FINISHED:
        result = { color: 'grey', 'text-decoration': 'line-through' };
        break;
    }
    return result;

  }

}
