import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';

@Injectable({
  providedIn: 'root'
})
export class SOAPService {

  client: Client;

  constructor(private soap: NgxSoapService) {
    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    //this.soap.createClient('assets/SI_WS_Orders_OutboundService.wsdl', {headers: headers})
    this.soap.createClient('assets/SI_Ping_OutboundService.wsdl', {headers: headers})
      .then(client => {
        console.log('Client', client);
        this.client = client;
        //(<any>this.client).AvailabilityChecks("").subscribe(
        (<any>this.client).SI_Ping_Outbound("").subscribe(
          (res: ISoapMethodResponse) => {
            console.log('method response', res);
            //this.xmlResponse = res.xml;
            let message = res.result;
            console.log(message)
            //this.loading = false;
          },
          err => console.log(err)
        );
      })
      .catch(err => console.log('Error', err));
  }
}
