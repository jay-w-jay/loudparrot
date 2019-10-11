import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simple Payroll';
  authenticated: Boolean;
  navItems = [];  

  constructor(private router: Router) {}

  ngOnInit() {
    this.authenticated = false;
    this.navItems = [
      {label: "Employees", path: "/employee/list"},
      {label: "Departments", path: "/department/list"},
      {label: "Accounts", path: "/account/list"},
      {label: "Shifts", path: "/shift/list"},
      {label: "Settings", path: "/setting/list"}
    ];

    if (!this.authenticated) {
      //redirect to login page
      if (!this.router.url.indexOf("register") || !this.router.url.indexOf("forgot"))
        this.router.navigate(['/login']);
    }
  }
}
