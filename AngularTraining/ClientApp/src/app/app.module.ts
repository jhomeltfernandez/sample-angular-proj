import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UserService } from '../services/users.service';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

import { PasswordHelper } from '../helpers/password.helper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserDetailsComponent } from './user/user-details/user-details.component';
import { LoginComponent } from './account/login/login.component';

import { AccountService } from '../services/account.service';

import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from '../guards/auth-guard.service';
import { RegisterComponent } from './account/register/register.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    UserDetailsComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: UserListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
      { path: 'user-create', component: UserCreateComponent, canActivate: [AuthGuard] },
      { path: 'user-edit/:id', component: UserEditComponent, canActivate: [AuthGuard]},
      { path: 'user-details/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:58093"],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [UserService, AccountService, PasswordHelper, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
