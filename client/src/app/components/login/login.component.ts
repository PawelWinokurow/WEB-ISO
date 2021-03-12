import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { TokenProlongationService } from 'src/app/services/token-prolongation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  identifier = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(private router: Router, public dictionaryService: DictionaryService,
    private toastr: ToastrService, private authService: AuthService, public errorMessageService: ErrorMessageService,
    private tokenProlongationService: TokenProlongationService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.tokenProlongationService.startChecking();
      this.router.navigate(['/preselection']);
    }
  }

  login() {
    this.authService.login(this.identifier.value, this.password.value)
      .then(() => {
        this.tokenProlongationService.startChecking();
        this.router.navigate(['/preselection']);
      })
      .catch(err => {
        console.log(err)
        if (err.status == "401") {
          this.toastr.error(this.dictionaryService.get('ICL'), this.dictionaryService.get('ERR'))
        } else {
          this.toastr.error(err.message, this.dictionaryService.get('ERR'))
        }
      });
  }

  register() {
    this.router.navigate(['/registration']);
  }

}
