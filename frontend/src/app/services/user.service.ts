import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modelInterfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4371';

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.post(`${this.uri}/users`, null);
  }

  getBlankUser() {
    var blankUser = {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      password: '',
      active: true,
      admin: false,
      finance: false,
      superAdmin: false,
      company: '',
      dateCreated: new Date(),
      lastLogin: new Date()
      };

      return blankUser;
  }

  getUserById(id) {
    return this.http.post(`${this.uri}/users/:id`, id);
  }

  addUser(user) {
    return this.http.post(`${this.uri}/users/add`, user);
  }

  updateUser(user: any) {
    return this.http.post(`${this.uri}/users/update/${user._id}`, user);
  }
}