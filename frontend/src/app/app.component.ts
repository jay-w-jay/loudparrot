import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simple Payroll';
  navItems = [];  

  ngOnInit() {
    this.navItems = [
      {label: "Employees", path: "/employee/list"},
      {label: "Departments", path: "/department/list"},
      {label: "Accounts", path: "/account/list"},
      {label: "Shifts", path: "/shift/list"},
      {label: "Settings", path: "/setting/list"}
    ];
  }
}
