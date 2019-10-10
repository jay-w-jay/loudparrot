import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Employee } from '../../../modelInterfaces/employee.model'
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];
  displayedColumns = [
    'firstName'
  , 'middleName'
  , 'lastName'
  , 'idNo'
  , 'pinNo'
  , 'nssfNo'
  , 'nhifNo'
  , 'actions'
];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeeService
    .getEmployees()
    .subscribe((data: Employee[]) => {
      this.employees = data;
      console.log('Data requested (employees)');
      console.log(this.employees);
    });
  }

  editEmployee(id) {
    this.router.navigate([`/employee/edit/${id}`]);
  }

}
