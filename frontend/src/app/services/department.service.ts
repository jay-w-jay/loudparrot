import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../modelInterfaces/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  uri = 'http://localhost:4371';

  constructor(private http: HttpClient) {
  }

  getDepartments() {
    return this.http.get(`${this.uri}/departments`);
  }

  getBlankDepartment() {
    return {
      name: '',
      description: '',
      active: false,
      maxEmployees: 0,
      minEmployees: 0,
      allowOvertime: false,
      allowPenalty: false
      };
  }

  getDepartmentById(id) {
    return this.http.get(`${this.uri}/departments/${id}`);
  }

  addDepartment(department) {
    return this.http.post(`${this.uri}/departments/add`, department);
  }

  updateDepartment(department: any) {
    return this.http.post(`${this.uri}/departments/update/${department._id}`, department);
  }
}