import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../modelInterfaces/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  uri = 'http://localhost:4371';

  constructor(private http: HttpClient) {
  }

  getEmployees() {
    return this.http.get(`${this.uri}/employees`);
  }

  getEmployeeById(id) {
    return this.http.get(`${this.uri}/employees/${id}`);
  }

  addEmployee(employee) {
    return this.http.post(`${this.uri}/employees/add`, employee);
  }
}