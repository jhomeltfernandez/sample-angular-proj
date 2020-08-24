import { Component, OnInit } from '@angular/core';
import { UserDataModel, UserService } from '../../../services/users.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  public users: UserDataModel;

  constructor(private _userService: UserService, private jwtHelper: JwtHelperService,) {
    this.getUsers();
  }

  ngOnInit() {
  }

  getUsers() {
    this._userService.getUsers().subscribe(data => this.users = data);
  }

  delete(userId) {
    const ans = confirm('You are about to delete a user. Please confirm to conitnue.');
    if (ans) {
      this._userService.delete(userId).subscribe((data) => {
        this.getUsers();
      });
    }
  }
}
