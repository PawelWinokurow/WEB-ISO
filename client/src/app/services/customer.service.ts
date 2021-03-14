import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpService, private http: HttpClient) { }

    /**
   * Sends customer to the server as JSON.
   * @param customer Object { isDirect: boolean, sapCustomer: SharedCustomer }
   * @returns Response observable.
   */
     sendCustomer(customer): Observable<any>{
      return this.httpService.request(this.http.post(`${environment.serverURL}/request`, {customer: JSON.stringify(customer)}));
    }
}
