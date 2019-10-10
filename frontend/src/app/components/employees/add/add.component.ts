import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-create',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  currentEmployee;
  constructor(private employeeService: EmployeeService, private router: Router) {}

  addEmployee() {
    this.employeeService.addEmployee(this.currentEmployee).subscribe(() => {
      this.router.navigate(['/employee/list']);
    })
  }

  ngOnInit() {
     this.currentEmployee = {
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

}