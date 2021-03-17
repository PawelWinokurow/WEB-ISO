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
    this.login();
  }

  ngOnInit(): void {
  }

  async login(){
    try {
      let params = await this.activeRoute.queryParams.toPromise();
      console.log(params)
      let isSuccessful = await this.authService.loginByHash(params.hash)
      if (isSuccessful) {

      }
    } catch(e) {

    }

  }

}
