import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../modelInterfaces/department.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class DepartmentEditComponent implements OnInit {

  id: String;
  currentDepartment: any = {};

  constructor(private empService: DepartmentService, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.empService.getDepartmentById(this.id).subscribe(res => {
        this.currentDepartment = res;
      });
    });
  }

  updateDepartment() {
    this.empService.updateDepartment(this.currentDepartment).subscribe(() => {
      this.snackBar.open('Department updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}