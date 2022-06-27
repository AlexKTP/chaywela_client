import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './component/carousel/carousel.component';
import { CreateFormComponent } from './component/create-form/create-form.component';
import { ListComponent } from './component/list/list.component';

const routes: Routes = [
  {
    path: 'landing',
    component: CarouselComponent
  },
  {
    path: 'projects',
    component: ListComponent
  },
  {
    path: 'tasks',
    component: ListComponent
  },
  {
    path: 'settings',
    component: ListComponent
  },
  {
    path: 'clock',
    component: ListComponent
  },
  {
    path: 'create',
    component: CreateFormComponent
  },
  {
    path: '**',
    redirectTo: 'landing'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
