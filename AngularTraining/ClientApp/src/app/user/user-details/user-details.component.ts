import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  userId: number;

  errorMessage: string;

  constructor(private avRoute: ActivatedRoute, public fb: FormBuilder, private router: Router, public userService: UserService) {
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

  get f() { return this.userForm.controls; }

}
