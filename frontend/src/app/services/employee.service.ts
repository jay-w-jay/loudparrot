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

  getBlankEmployee() {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      mobileNo: '',
      personalEmail: '',
      workEmail: '',
      gender: 'Male',
      telNo: '',
      homeAddress: '',
      homeTown: '',
      postCode: '',
      idNo: 0,
      pinNo: '',
      nssfNo: '',
      nhifNo: '',
      dateOfBirth: new Date(),
      dateEmployed: new Date(),
      contractType: '',
      departmentId: '',
      contractSoftCopy: '',
      bankName: '',
      bankBranch: '',
      accountNo: '',
      bankCode: '',
      branchCode: '',
      hasOvertime: false,
      nextOfKinName: '',
      nextOfKinRelationship: '',
      nextOfKinTel: '',
      nextOfKinEmail: ''
      };
  }

  getEmployeeById(id) {
    return this.http.get(`${this.uri}/employees/${id}`);
  }

  addEmployee(employee) {
    return this.http.post(`${this.uri}/employees/add`, employee);
  }

  updateEmployee(employee: any) {
    return this.http.post(`${this.uri}/employees/update/${employee._id}`, employee);
  }
}