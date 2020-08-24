import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Inject } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';

export class UserService {
  appurl: string = "";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpobj: HttpClient, @Inject('BASE_URL') _baseurl: string) {
    this.appurl = _baseurl;
  }

  getUsers(): Observable<UserDataModel> {
    return this.httpobj.get<UserDataModel>(this.appurl + "api/users");
  }

  getUser(userId: number): Observable<UserDataModel> {
    return this.httpobj.get<UserDataModel>(this.appurl + "api/users/" + userId).pipe(
      retry(1)
    );
  }

  update(userId: number, user): Observable<UserDataModel> {
    return this.httpobj.put<UserDataModel>(this.appurl + "api/users/update-details/" + userId, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1)
      );
  }

  delete(userId: number): Observable<UserDataModel> {
    return this.httpobj.delete<UserDataModel>(this.appurl + "api/users/" + userId)
      .pipe(
        retry(1)
      );
  }

  create(user): Observable<UserDataModel> {
    return this.httpobj.post<UserDataModel>(this.appurl + 'api/users', JSON.stringify(user), this.httpOptions).pipe();
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}


export class UserDataModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
