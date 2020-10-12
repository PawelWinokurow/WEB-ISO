import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SOAPService } from 'src/app/services/soap.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private soapService: SOAPService, private router: Router,){
    this.router.navigate(['/new-kea'])
  }
  ngOnInit(): void {
  }

}
