import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-create',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class DepartmentAddComponent implements OnInit {
  currentDepartment;
  constructor(private departmentService: DepartmentService, private router: Router) {}

  addDepartment() {
    this.departmentService.addDepartment(this.currentDepartment).subscribe(() => {
      this.router.navigate(['/department/list']);
    })
  }

  ngOnInit() {
     this.currentDepartment = this.departmentService.getBlankDepartment();
  }

}