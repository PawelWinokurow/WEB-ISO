import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';

@Injectable({
  providedIn: 'root'
})
export class SOAPService {

  client: Client;

  constructor(private soap: NgxSoapService) {
    const body = {
      SourceSystem: "PC",
    };
    //this.sendSOAP(body, 'assets/SI_WS_Orders_OutboundService.wsdl')
  }

  sendSOAP(body, path = 'assets/SI_WS_Orders_OutboundService.wsdl') {
    let headers = new HttpHeaders();
    //headers.append('Access-Control-Allow-Origin', '*');
    //this.soap.createClient('assets/SI_Ping_OutboundService.wsdl', {headers: headers})
    this.soap.createClient(path, {headers: headers})
      .then(client => {
        this.client = client;
        //(<any>this.client).SI_Ping_Outbound("").subscribe(
        (<any>this.client).AvailabilityChecks(body).subscribe(
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
