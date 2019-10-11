import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../modelInterfaces/department.model';

@Component({
  selector: 'app-edit',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css']
})
export class DepartmentEditComponent implements OnInit {
  isNew: Boolean
  id: String;
  currentDepartment: any = {};

  constructor(private empService: DepartmentService, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.isNew = false;
      this.empService.getDepartmentById(this.id).subscribe(res => {
        this.currentDepartment = res;
      });
    });
  }

  saveDepartment() {
    this.empService.updateDepartment(this.currentDepartment).subscribe(() => {
      this.snackBar.open('Department updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}