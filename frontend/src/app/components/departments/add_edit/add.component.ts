import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-create',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css']
})
export class DepartmentAddComponent implements OnInit {
  currentDepartment;
  isNew: Boolean
  constructor(private departmentService: DepartmentService, private router: Router) {}

  saveDepartment() {
    this.departmentService.addDepartment(this.currentDepartment).subscribe(() => {
      this.router.navigate(['/department/list']);
    })
  }

  ngOnInit() {
    this.isNew = true;
     this.currentDepartment = this.departmentService.getBlankDepartment();
  }

}