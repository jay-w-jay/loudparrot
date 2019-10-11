import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeService } from './services/employee.service';
import { DepartmentService } from './services/department.service';

import { MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatCheckboxModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeListComponent } from './components/employees/list/list.component';
import { EmployeeAddComponent } from './components/employees/add/add.component';
import { EmployeeEditComponent } from './components/employees/edit/edit.component';
import { DepartmentListComponent } from './components/departments/list/list.component';
import { DepartmentAddComponent } from './components/departments/add_edit/add.component';
import { DepartmentEditComponent } from './components/departments/add_edit/edit.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'employee/add', component: EmployeeAddComponent},
  { path: 'employee/list', component: EmployeeListComponent},
  { path: 'employee/edit/:id', component: EmployeeEditComponent},
  { path: 'department/add', component: DepartmentAddComponent},
  { path: 'department/list', component: DepartmentListComponent},
  { path: 'department/edit/:id', component: DepartmentEditComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    DepartmentListComponent,
    DepartmentAddComponent,
    DepartmentEditComponent,
    LoginComponent,
    PasswordResetComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService, DepartmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
