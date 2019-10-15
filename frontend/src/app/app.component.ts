import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simple Payroll';
  authenticated;
  navItems = [];  
  currentUrl;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        var newUrl = event.url;
        var localStorageAuthStatus = localStorage.getItem("authenticated");
        if (localStorageAuthStatus) {
          //local storage authentication tag is available
          if (localStorageAuthStatus === "true") {
            //this.authenticated = true;
            console.log("User is authenticated");
            //this.setAuthStatus(true)
          } else {
            //User has not been authenticated
            this.setAuthStatus(false);
            this.forceLogin();
            console.error("User is not authenticated")
          }
        } else {
          //no authentication tag in local storage
          this.forceLogin();
        }
        this.currentUrl = newUrl;
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  setAuthStatus(authStatus) {
    this.authenticated = authStatus;
  }

  ngOnInit() {
    console.log("ngInit");
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
        this.forceLogin();
    }
  }

  forceLogin() {
    this.router.navigate(['/login']);
  }
}
