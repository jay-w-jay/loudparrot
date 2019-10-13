import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simple Payroll';
  authenticated: Boolean;
  navItems = [];  

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        console.log("starting nav to " + event.url);
        var newUrl = event.url;
        console.log("login index " + newUrl.indexOf("login"))
        if (newUrl.indexOf("login") > 0 || newUrl.indexOf("register") > 0)  {
          localStorage.setItem('authenticated', '0');
        } else
        {
          console.log("not going to login");
          var isAuthenticated = localStorage.getItem('authenticated');
          console.log("is authenticated = " + isAuthenticated);
          if (isAuthenticated) {
            if (isAuthenticated === "1") {
              // We are authenticated
              this.authenticated = true;
            } else {
              //not authenticated
              this.authenticated = false;
              this.router.navigate(['/login']);
              localStorage.setItem('authenticated', '0');
            }
          } else {
            //Authentication status not set
            this.router.navigate(['/login']);
            localStorage.setItem('authenticated', '0');
          }
        }
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

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
