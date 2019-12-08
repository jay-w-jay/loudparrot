import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './pages/home/home-layout/home-layout.component';
import { NewListComponent } from './pages/home/new-list/new-list.component';
import { NewTaskComponent } from './pages/task/new-task/new-task.component';
import { LoginPageComponent } from './pages/authentication/login-page/login-page.component';
import { TaskItemComponent } from './pages/task/task-item/task-item.component';
import { WebReqInterceptor } from './services/web-req.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    NewListComponent,
    NewTaskComponent,
    LoginPageComponent,
    TaskItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
