import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Inject } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDataModel } from "./users.service";

export class AccountService {
  appurl: string = "";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpobj: HttpClient, @Inject('BASE_URL') _baseurl: string, private jwtHelper: JwtHelperService,) {
    this.appurl = _baseurl;
  }

  login(credentials) {
    return this.httpobj.post(this.appurl + 'api/account/authenticate', JSON.stringify(credentials), this.httpOptions).pipe();
  }

  register(user): any {
    return this.httpobj.post(this.appurl + 'api/account/register', JSON.stringify(user), this.httpOptions).pipe();
  }

  logOut() {
    localStorage.removeItem("jwt");
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
}
