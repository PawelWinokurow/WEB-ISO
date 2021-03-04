import { Component } from '@angular/core';
import { Router } from '@angular/router';


/**
 * The entry point of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private router: Router,){
  }
}
