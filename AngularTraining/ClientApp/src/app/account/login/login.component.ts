import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  invalidLogin = false;
  errMessage = '';

  constructor(public fb: FormBuilder, private router: Router, public accountService: AccountService) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  submitForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.accountService.login(this.form.value).subscribe(response => {
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
      this.router.navigate(['']).then(() => { window.location.reload(); });
      }, err => {
        this.invalidLogin = true;
        this.errMessage = err.error;
    });


  }

  get f() { return this.form.controls; }
}
