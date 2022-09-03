import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ListType } from 'src/app/enums/list-type.enum';
import { CustomResponse } from 'src/app/models/custom-response';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/service/project.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  type!: ListType;

  project: Project = {} as Project;
  projects$!: Observable<CustomResponse>;
  users$!: Observable<CustomResponse>;
  userList: Array<User> = [];
  selectedList: User[] = [];


  projectForm = this.formBuilder.group({
    name: null,
    description: null,
    projectType: null,
    userId: null
  });

  taskForm = this.formBuilder.group({
    title: null,
    description: null,
    status: null,
    duration: null,
    difficulty: null,
    progress: null,
    estimatedTime: null
  });


  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.forEach((params: Params) => {
      this.type = params['type'];
      console.log('>>>>>' + this.type);
    });

    this.projects$ = this.projectService.projects$;
    this.projects$.subscribe();



    this.users$ = this.userService.users$.pipe(
      tap({
        next: value => {
          this.userList = [];
          this.userList = (value.data.objList) as Array<User>
        },
        error: error => console.log(error),
        complete: () => {
          console.log('Fetching users done!')
        }
      })
    );

    this.users$.subscribe({
      complete: () => {
        this.selectedList = this.userList;
        console.log(this.selectedList);
      }
    });
  }

  onSubmitNewProject(): void {

    console.log("on lance la création");
    this.project = { ...this.projectForm.value } as Project;

    this.projects$ = this.projectService.save$(this.project);
    this.projects$.subscribe({
      next: (value) => this.project = value.data.obj as Project,
      error: error => console.log(error),
      complete: () => {
        console.log('Creation project done!')
        this.router.navigate(['/', 'projects']);
        console.log(this.projectForm.reset);
        location.reload();
      }
    })

  }

  onSubmitNewTask(): void {
    console.log('On soumet un nouveau form de tache')
  }

}
