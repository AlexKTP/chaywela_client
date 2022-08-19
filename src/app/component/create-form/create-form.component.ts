import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListType } from 'src/app/enums/list-type.enum';
import { ProjectType } from 'src/app/enums/project-type.enum';
import { CustomResponse } from 'src/app/models/custom-response';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  type!: ListType;

  project: Project = {} as Project;
  projects$!: Observable<CustomResponse>;


  projectForm = this.formBuilder.group({
    name: null,
    description: null,
    projectType: null,
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


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private projectService: ProjectService, private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    this.activatedRoute.params.forEach((params: Params) => {
      this.type = params['type'];
      console.log('>>>>>' + this.type);
    });
  }

  onSubmitNewProject(): void {

    console.log("on lance la création");
    this.project = { ...this.projectForm.value } as Project;

    //TODO Display User or Get Programmtically user from route
    this.project.refUser = 1;


    this.projects$ = this.projectService.save$(this.project);
    this.projects$.subscribe({
      next: (value) => this.project = value.data.obj as Project,
      error: error => console.log(error),
      complete: () => {
        console.log('Creation project done!')
        this.router.navigate(['/', 'projects']);
        console.log(this.projectForm.reset);
      }
    })

  }

  onSubmitNewTask(): void {
    console.log('On soumet un nouveau form de tache')
  }

}
