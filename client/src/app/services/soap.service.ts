import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';
import { Mask } from '../interfaces/mask';

@Injectable({
  providedIn: 'root'
})
export class SOAPService {


  constructor(private soap: NgxSoapService) {
  }

  sendMask(mask: Mask){
    
  }

  sendSOAP(body, path = 'assets/SI_ISO_MGB_BAPI_PARTNER_CREATE_outboundService_dev.wsdl') {

    const data = {
      SourceSystem: "PC",
    };

    var username = "T_SI_MONPING"
    var password = "a09KIqg?9ofO"

    //var username = "T_SI_IWF_T"
    //var password = "N}+XyAE]A]>WcfnlR3D-gRyCHRbdyk5]+w\f4hhm"
    console.log(password)

    var auth = "Basic " + btoa(username + ":" + password);
    //let headers = new HttpHeaders();
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('Authorization', auth);
    this.soap.createClient('assets/SI_Ping_OutboundService.wsdl')
    //this.soap.createClient('assets/SI_WS_Orders_OutboundService.wsdl')
    //this.soap.createClient('assets/SI_ISO_MGB_BAPI_PARTNER_CREATE_outboundService_dev.wsdl')
      .then(client => {
        client.addHttpHeader('Authorization', auth);
        //(<any>client).SI_ISO_MGB_BAPI_PARTNER_CREATE_outbound(data).subscribe(
        //(<any>client).AvailabilityChecks(data).subscribe(
        (<any>client).SI_Ping_Outbound("").subscribe(
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
