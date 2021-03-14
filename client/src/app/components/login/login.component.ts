import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  loginForm: FormGroup;


  constructor(private router: Router, public dictionaryService: DictionaryService, private formBuilder: FormBuilder,
    private toastrService: ToastrService, private authService: AuthService, public errorMessageService: ErrorMessageService,
    private tokenProlongationService: TokenProlongationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    if (this.authService.isLoggedIn()) {
      this.tokenProlongationService.startChecking();
      this.router.navigate(['/preselection']);
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.controls['identifier'].value, this.loginForm.controls['password'].value)
        .then(() => {
          this.tokenProlongationService.startChecking();
          this.router.navigate(['/preselection']);
        })
        .catch(err => {
          if (err.status == "401") {
            this.toastrService.error(this.dictionaryService.get('IDINC'), this.dictionaryService.get('ERR'))
          } else {
            this.toastrService.error(err.message, this.dictionaryService.get('ERR'))
          }
        });
    }
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  register() {
    this.router.navigate(['/registration']);
  }

}
