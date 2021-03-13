import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MaskService {

  constructor(private httpService: HttpService, private http: HttpClient) { }

    /**
   * Sends customer mask to the server as JSON.
   * @param mask Object { isDirect: boolean, sapMask: SharedMask }
   * @returns Response observable.
   */
     sendMask(mask): Observable<any>{
      return this.httpService.request(this.http.post(`${environment.serverURL}/request`, {mask: JSON.stringify(mask)}));
    }
}
