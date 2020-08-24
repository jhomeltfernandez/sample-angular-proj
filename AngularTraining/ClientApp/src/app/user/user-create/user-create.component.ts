import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/users.service';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { PasswordHelper } from '../../../helpers/password.helper';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  constructor(public fb: FormBuilder, private router: Router, public userService: UserService, public pwHelper: PasswordHelper) { }

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

    this.userService.create(this.userForm.value).subscribe(res => { 
      console.log(res, 'user create successfully');
      this.router.navigate(['/user-list']);
    })


  }

  get f() { return this.userForm.controls; }

}

//export function MustMatch(controlName: string, matchingControlName: string) {
//  return (formGroup: FormGroup) => {
//      const control = formGroup.controls[controlName];
//      const matchingControl = formGroup.controls[matchingControlName];

//      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
//          // return if another validator has already found an error on the matchingControl
//          return;
//      }

//      // set error on matchingControl if validation fails
//      if (control.value !== matchingControl.value) {
//          matchingControl.setErrors({ mustMatch: true });
//      } else {
//          matchingControl.setErrors(null);
//      }
//  }
//}
