import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { UserCardComponent } from './component/user-card/user-card.component';
import { ListComponent } from './component/list/list.component';
import { CreateFormComponent } from './component/create-form/create-form.component'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CarouselComponent,
    UserCardComponent,
    ListComponent,
    CreateFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
