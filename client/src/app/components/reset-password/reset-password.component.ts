import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  hash: string = null;
  showResetForm = false;
  passwordForm: FormGroup;
  hide1 = true;
  hide2 = true;

  constructor(private route: ActivatedRoute, public dictionaryService: DictionaryService,
    private formBuilder: FormBuilder, public errorMessageService: ErrorMessageService,
    private authService: AuthService, private accountService: AccountService,
    private validationService: ValidationService, private router: Router) {
    this.checkHash();
  }

  ngOnInit(): void {
    this.authService.logout();
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.validationService.mustMatch('password', 'confirmPassword') });
  }

  async checkHash() {
    try {
      this.hash = this.route.snapshot.queryParamMap.get('hash');
      if (this.hash) {
        let result = await this.authService.checkHash(this.hash);
        if (result?.isTrue) {
          this.showResetForm = true;
        }
      }
    } catch (e) {

    }
  }

  async change() {
    if (this.passwordForm.valid) {
      try{
        let result = await this.accountService.resetPassword({hash: this.hash, password:this.passwordForm.controls['password'].value}).toPromise();
        this.router.navigate(['/login']);
      } catch (e){
        console.error(e);
      }
    } else {
      //Trigger password form validation
      this.passwordForm.markAllAsTouched();
    }
  }

  get passwordFormControl() {
    return this.passwordForm.controls;
  }
}
