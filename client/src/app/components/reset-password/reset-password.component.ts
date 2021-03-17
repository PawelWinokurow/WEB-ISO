import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private authService: AuthService) {
    activeRoute.queryParams
      .subscribe((params) => 
        {
          console.log(params)
          this.authService.loginByHash("params");
          this.authService.loginByHash("params").then(isSuccessful => { if (isSuccessful) {

          }});;

    });
  }

  ngOnInit(): void {
  }

}
