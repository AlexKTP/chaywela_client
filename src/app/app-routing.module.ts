import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './component/carousel/carousel.component';
import { CreateFormComponent } from './component/create-form/create-form.component';
import { ListComponent } from './component/list/list.component';
import { SettingsComponent } from './component/settings/settings.component';

const routes: Routes = [
  {
    path: 'users',
    children: [
      { path: '', component: CarouselComponent },
      {
        path: ":idUser/projects", children: [
          { path: '', component: ListComponent },
          { path: ':idTask/tasks', component: ListComponent },
        ]
      }
    ]
  },
  {
    path: 'projects',
    children: [
      { path: '', component: ListComponent },
      { path: ":idProject/tasks", component: ListComponent }
    ]
  },
  {
    path: 'tasks',
    component: ListComponent
  },
  {
    path: 'settings',
    children: [
      { path: '', component: SettingsComponent },
      { path: ":idUser/tasks", component: SettingsComponent }
    ]
  },
  {
    path: 'clock',
    component: CarouselComponent
  },
  {
    path: 'create/:type',
    component: CreateFormComponent
  },
  {
    path: '**',
    redirectTo: 'users'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
