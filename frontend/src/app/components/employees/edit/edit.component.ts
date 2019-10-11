import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../modelInterfaces/employee.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  id: String;
  currentEmployee: any = {};

  constructor(private empService: EmployeeService, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.empService.getEmployeeById(this.id).subscribe(res => {
        this.currentEmployee = res;
      });
    });
  }

  updateEmployee() {
    this.empService.updateEmployee(this.currentEmployee).subscribe(() => {
      this.snackBar.open('Employee updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}