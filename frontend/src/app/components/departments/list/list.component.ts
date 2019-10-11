import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Department } from '../../../modelInterfaces/department.model'
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class DepartmentListComponent implements OnInit {

  departments: Department[];
  displayedColumns = [
    'name'
  , 'description'
  , 'active'
  , 'actions'
];

  constructor(private departmentService: DepartmentService, private router: Router) { }

  ngOnInit() {
    this.fetchDepartments();
  }

  fetchDepartments() {
    this.departmentService
    .getDepartments()
    .subscribe((data: Department[]) => {
      this.departments = data;
      console.log('Data requested (departments)');
      console.log(this.departments);
    });
  }

  editDepartment(id) {
    this.router.navigate([`/department/edit/${id}`]);
  }

}
