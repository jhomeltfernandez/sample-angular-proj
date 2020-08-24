import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PasswordHelper } from '../../../helpers/password.helper';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  isSubmitSuccess = false;
  successMessage = '';
  errMessage = ''

  constructor(public fb: FormBuilder, private router: Router, public accountService: AccountService, public pwHelper: PasswordHelper) {
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.pwHelper.MustMatch('password', 'confirmPassword')
    })
  }

  submitForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.accountService.register(this.userForm.value).subscribe(res => {
      console.log(res);
      this.isSubmitSuccess = true;
      this.successMessage = res.message;
    }, err => {
      this.errMessage = err.error
    })

    
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  get f() { return this.userForm.controls; }

}
