import { Component, OnInit } from '@angular/core';
import { SOAPService } from 'src/app/services/soap.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private soapService: SOAPService){}

  ngOnInit(): void {
  }

}
