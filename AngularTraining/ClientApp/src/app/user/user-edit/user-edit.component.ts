import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/users.service';
import { PasswordHelper } from '../../../helpers/password.helper';
import { error } from 'protractor';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  userId: number;

  errorMessage: string;

  constructor(private avRoute: ActivatedRoute, public fb: FormBuilder, private router: Router, public userService: UserService, public pwHelper: PasswordHelper) {
    const idParam = 'id';

    if (this.avRoute.snapshot.params[idParam]) {
      this.userId = this.avRoute.snapshot.params[idParam];
    }

    this.userForm = this.fb.group({
      id: [0, [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit() {
    if (this.userId > 0) {
      this.userService.getUser(this.userId).subscribe(res => {
        this.userForm.patchValue({
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
        });
      });
    }
  }

  submitForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.userService.update(this.userId, this.userForm.value).subscribe(res => {
      console.log(res, 'user was successfully modified');
      this.router.navigate(['/user-list']);
    }, error => {
        this.errorMessage = error.error;
    })


  }

  get f() { return this.userForm.controls; }

}
