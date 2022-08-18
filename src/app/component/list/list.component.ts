import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
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
  appState$!: Observable<CustomResponse>;
  projectNumber!: number;
  taskNumber!: number;



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
        this.initProject();
        break
      case 'tasks':
        this.initTask();
        break;
    }




    /*  if (this.idProject != undefined && this.tasksNonFiltered.length > 0) {
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
      }*/

  }

  initProject() {
    this.appState$ = this.projectService.projects$.pipe(
      tap({
        next: value => {
          console.log("on est la pipe du project service " + value);
          console.log('voici value.data ' + value.data)
          this.projects = value.data.objList as Project[];
          this.projectNumber = this.projects != undefined ? this.projects.length : -1;
        },
        error: error => console.log(error),
        complete: () => {
          console.log('Fetching project done with' + this.projectNumber + 'retrieved!')
        }
      })
    );

    this.appState$.subscribe(
      {
        complete: () => {
          for (let u in this.projects) {
            console.log('Project detail: ' + u)
          }
        }
      }
    );
  }

  initTask() {
    this.appState$ = this.taskService.tasks$.pipe(
      tap({
        next: value => {
          console.log("on est la pipe du task service " + value);
          this.tasks = (value.data.objList) as Task[]
          this.taskNumber = this.tasks != undefined ? this.tasks.length : -1;
        },
        error: error => console.log(error),
        complete: () => {
          console.log('Fetching tasks done!')
        }
      })
    );

    this.appState$.subscribe(
      {
        complete: () => {
          for (let u in this.tasks) {
            console.log('Task: ' + u)
          }
        }
      }
    );
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
