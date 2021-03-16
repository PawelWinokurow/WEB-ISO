import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  async login() {
    if (this.loginForm.valid) {    
      let isSuccessful = await this.authService.login(this.loginForm.controls['identifier'].value, this.loginForm.controls['password'].value);
      if (isSuccessful) {
        this.tokenProlongationService.startChecking();
        this.router.navigate(['/preselection']);
      }
    }
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  forgotPassword(){

  }
  
  register() {
    this.router.navigate(['/registration']);
  }

}
