import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ListType } from 'src/app/enums/list-type.enum';
import { ProjectType } from 'src/app/enums/project-type.enum';
import { Status } from 'src/app/enums/status.enum';
import { CustomResponse } from 'src/app/models/custom-response';
import { Project } from 'src/app/models/project';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/service/project.service';
import { TaskService } from 'src/app/service/task.service';
import { UserService } from 'src/app/service/user.service';


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
  users$!: Observable<CustomResponse>;
  userList: [] = [];
  project: Project = {} as Project;
  projects$!: Observable<CustomResponse>;

  response = {
    id: null,
    name: null,
    description: null,
    user: null
  }


  projectForm = this.formBuilder.group({
    id: null,
    name: null,
    description: null,
    projectType: null,
    refUser: null
  });


  projectTypes: any = ProjectType;


  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) {
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


    this.users$ = this.userService.users$.pipe(
      tap({
        next: value => {
          this.userList = [];
          this.userList = (value.data.objList) as [];
          this.userList.forEach(u => u as User);
        },
        error: error => console.log(error),
        complete: () => {
          console.log('Fetching users done!')
        }
      })
    );

    this.users$.subscribe({
      complete: () => {
      }
    });




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
    let userId: number = -1;

    this.activatedRoute.params.subscribe((params: Params) => {
      userId = parseInt(params['idUser']);
    });


    if (!isNaN(userId) && userId != -1) {

      this.appState$ = this.projectService.projects$.pipe(
        tap({
          next: value => {
            this.projectService.filterByUser$(userId, value).subscribe(
              val => {
                console.log("on est la pipe du project service " + val);
                this.projects = (val.data.objList) as Project[]
                this.projectNumber = this.projects != undefined ? this.projects.length : -1;
              }
            );

          },
          error: error => console.log(error),
          complete: () => {
            console.log('Fetching projects done!')
          }
        })
      );

      this.appState$.subscribe();
    } else {
      this.appState$ = this.projectService.projects$.pipe(
        tap({
          next: value => {
            console.log("on est la pipe du project service " + value);
            this.projects = (value.data.objList) as Project[]
            this.projectNumber = this.projects != undefined ? this.projects.length : -1;
          },
          error: error => console.log(error),
          complete: () => {
            console.log('Fetching tasks done!')
          }
        })
      );

      this.appState$.subscribe();
    }
  }

  initTask() {



    let projectID: number = -1;

    this.activatedRoute.params.subscribe((params: Params) => {
      projectID = parseInt(params['idProject']);
    });


    if (!isNaN(projectID) && projectID != -1) {

      this.appState$ = this.taskService.tasks$.pipe(
        tap({
          next: value => {
            this.taskService.filterByProject$(projectID, value).subscribe(
              val => {
                console.log("on est la pipe du task service " + val);
                this.tasks = (val.data.objList) as Task[]
                this.taskNumber = this.tasks != undefined ? this.tasks.length : -1;
              }
            );

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
    } else {
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


  deleteProject(projectId: number) {

    console.log("voici l'id a delete : " + projectId);
    this.projects$ = this.projectService.delete$(projectId);
    this.projects$.subscribe({
      next: (value) => this.projects = value.data.objList as Project[],
      error: error => console.log(error),
      complete: () => {
        console.log('DeleteDone!')
        this.router.navigate(['/', 'projects']);
        location.reload();
      }
    }
    )
  }

  onSubmit(form: any) {

    form.value.projectType = form.value.projectType == 'PRIVATE' ? 0 : 1;

    this.project = { ...form.value }

    this.projects$ = this.projectService.save$(this.project);
    this.projects$.subscribe({
      next: (value) => this.project = value.data.obj as Project,
      error: error => console.log(error),
      complete: () => {
        console.log('Creation project done!')
        this.router.navigate(['/', 'projects']);
        this.projectForm.reset();
        location.reload();
      }
    })
  }

  console(id: number) {
    console.log(id);
  }


  keys(): Array<string> {
    var keys = Object.keys(this.projectTypes);
    return keys.slice(keys.length / 2);
  }



}
