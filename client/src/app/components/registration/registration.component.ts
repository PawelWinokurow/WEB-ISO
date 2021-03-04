import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  hide1 = true;
  hide2 = true;
  registerForm: FormGroup;
  submitted = false;

  constructor(private router: Router, public dictionaryService: DictionaryService, private formBuilder: FormBuilder, 
    public errorMessageService: ErrorMessageService, private authService: AuthService, private toastr: ToastrService,) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  register() {
    this.submitted = true;
    if (this.registerForm.valid && this.registerForm.controls['password'].value == this.registerForm.controls['confirmPassword'].value) {
      var newUser = {username: this.registerForm.controls['username'], password: this.registerForm.controls['password'], email: this.registerForm.controls['email']}
      this.authService.createUser(this.registerForm.value).toPromise()
      .then(() => {
        this.toastr.success(this.dictionaryService.get('UWC'), this.dictionaryService.get('SUC'));
        this.router.navigate(['/login']);
      })
      .catch((err) => this.toastr.error(err, this.dictionaryService.get('ERR')));
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  matchPasswords() {
      const password = this.registerForm.get('password');
      const confirmPassword= this.registerForm.get('confirmPassword');
      return password !== confirmPassword;
  }

  back() {
    this.router.navigate(['/login']);
  }
}
