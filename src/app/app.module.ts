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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './component/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CarouselComponent,
    UserCardComponent,
    ListComponent,
    CreateFormComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
