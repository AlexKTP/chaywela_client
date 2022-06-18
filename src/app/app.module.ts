import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { UserCardComponent } from './component/user-card/user-card.component';
import { ListComponent } from './component/list/list.component'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CarouselComponent,
    UserCardComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
