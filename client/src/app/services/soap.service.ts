import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';
import { Mask } from '../interfaces/mask';

@Injectable({
  providedIn: 'root'
})
export class SOAPService {

  client: Client;

  constructor(private soap: NgxSoapService) {
  }

  sendMask(mask: Mask) {

  }

  sendSOAP(body, path = 'assets/SI_ISO_MGB_BAPI_PARTNER_CREATE_outboundService_dev.wsdl') {
    var args = "";
    var username = "T_SI_MONPING"
    var password = "a09KIqg?9ofO"

    var auth = "Basic " + btoa(username + ":" + password);
    this.soap.createClient('assets/SI_Ping_OutboundService.wsdl')
      .then(client => {
        client.addHttpHeader('Authorization', auth);
        (<any>client).SI_Ping_Outbound(args).subscribe(
          (res: ISoapMethodResponse) => {
            console.log('method response', res);
            let message = res.result;
            console.log(message)
          },
          err => console.log(err)
        );
      })
      .catch(err => console.log('Error', err));
  }
}
