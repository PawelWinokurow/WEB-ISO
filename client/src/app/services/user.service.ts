import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.httpService.request(this.http.post(`${environment.serverURL}/user`, { user }));
  }

  updateUser(user) {
    return this.httpService.request(this.http.put(`${environment.serverURL}/user`, { user }));
  }

  deleteUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {user: user}
    };
    return this.httpService.request(this.http.delete(`${environment.serverURL}/user`, httpOptions));
  }

  blockOrResetUser(user) {
    return this.httpService.request(this.http.patch(`${environment.serverURL}/user`, { user }));
  }

  getUsers(): Observable<any> {
    return this.httpService.request(this.http.get(`${environment.serverURL}/users`));
  }
}
