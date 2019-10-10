import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeListComponent } from './components/employees/list/list.component';
import { EmployeeAddComponent } from './components/employees/add/add.component';
import { EmployeeEditComponent } from './components/employees/edit/edit.component';
import { DepartmentListComponent } from './components/departments/list/list.component';
import { DepartmentAddComponent } from './components/departments/add/add.component';
import { DepartmentEditComponent } from './components/departments/edit/edit.component';

const routes: Routes = [
  { path: 'employee/add', component: EmployeeAddComponent},
  { path: 'employee/list', component: EmployeeEditComponent},
  { path: 'employee/edit/:id', component: EmployeeListComponent},
  { path: 'department/add', component: DepartmentAddComponent},
  { path: 'department/list', component: DepartmentListComponent},
  { path: 'department/edit/:id', component: DepartmentEditComponent},
  { path: '', redirectTo: '/employee/list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    DepartmentListComponent,
    DepartmentAddComponent,
    DepartmentEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
