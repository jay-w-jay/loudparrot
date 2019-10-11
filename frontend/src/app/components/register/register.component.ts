import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { UserService } from '../../services/user.service';
import { User } from '../../modelInterfaces/user.model';

@Component({
  selector: 'app-edit',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isNew: Boolean
  id: String;
  currentUser;

  constructor(private userService: UserService, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.currentUser = userService.getBlankUser();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.isNew = true;
      if (this.id) {
        this.userService.getUserById(this.id).subscribe(res => {
          this.currentUser = res;
        });
    } else {
      this.currentUser = this.userService.getBlankUser();
    }
    });
  }

  saveUser() {
    this.userService.addUser(this.currentUser).subscribe(() => {
      this.snackBar.open('User added successfully', 'OK', {
        duration: 3000
      });
    });
  }

}