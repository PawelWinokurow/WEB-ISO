import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private httpService: HttpService) { }

  createUser(user) {
    return this.httpService.request(this.http.post(`${environment.serverURL}/user`, {user}));
  }

  updateUser(user) {
    return this.httpService.request(this.http.put(`${environment.serverURL}/user`, {user}));
  }

  deleteUser(user) {
    return this.httpService.request(this.http.delete(`${environment.serverURL}/user`, user.email));
  }

  blockOrResetUser(user) {
    return this.httpService.request(this.http.patch(`${environment.serverURL}/user`, {user}));
  }

  getUsers(): Observable<any>{
    return this.httpService.request(this.http.get(`${environment.serverURL}/users`));
  }
}
