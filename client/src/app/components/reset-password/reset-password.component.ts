import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  hash: string = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.login();
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  async login() {
    try {
      this.hash = this.route.snapshot.queryParamMap.get('hash');
      console.log(this.hash)
      if (this.hash){
        let result = await this.authService.checkHash(this.hash);
        console.log(result.isTrue)
        if (result?.isTrue) {
          //TODO show reset password form
        }
      }
    } catch (e) {

    }

  }

}
