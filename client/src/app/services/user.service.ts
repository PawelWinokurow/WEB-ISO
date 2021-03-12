import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user) {
    return this.http.post(`${environment.serverURL}/user`, user);
  }

  updateUser(user) {
    return this.http.put(`${environment.serverURL}/user`, user);
  }

  deleteUser(user) {
    return this.http.delete(`${environment.serverURL}/user`, user);
  }

  getUsers(){
    return this.http.get(`${environment.serverURL}/users`);
  }
}
