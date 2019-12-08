import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './pages/home/home-layout/home-layout.component';
import { NewListComponent } from './pages/home/new-list/new-list.component';
import { NewTaskComponent } from './pages/task/new-task/new-task.component';
import { LoginPageComponent } from './pages/authentication/login-page/login-page.component';


const routes: Routes = [
  {path: '', redirectTo: 'lists', pathMatch: 'full'},
  {path: 'new-list', component: NewListComponent},
  {path: 'lists/:listId', component: HomeLayoutComponent},
  {path: 'lists', component: HomeLayoutComponent},
  {path: 'lists/:listId/new-task', component: NewTaskComponent},
  {path: 'login', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
