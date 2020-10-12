import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SOAPService } from './services/soap.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private router: Router,){
    this.router.navigate(['/main'])
  }
}
