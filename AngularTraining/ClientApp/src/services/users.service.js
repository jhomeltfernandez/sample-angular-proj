"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var UserService = /** @class */ (function () {
    function UserService(httpobj, _baseurl) {
        this.httpobj = httpobj;
        this.appurl = "";
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this.appurl = _baseurl;
    }
    UserService.prototype.getUsers = function () {
        return this.httpobj.get(this.appurl + "api/users");
    };
    UserService.prototype.getUser = function (userId) {
        return this.httpobj.get(this.appurl + "api/users/" + userId).pipe(operators_1.retry(1));
    };
    UserService.prototype.update = function (userId, user) {
        return this.httpobj.put(this.appurl + "api/users/update-details/" + userId, JSON.stringify(user), this.httpOptions)
            .pipe(operators_1.retry(1));
    };
    UserService.prototype.delete = function (userId) {
        return this.httpobj.delete(this.appurl + "api/users/" + userId)
            .pipe(operators_1.retry(1));
    };
    UserService.prototype.create = function (user) {
        return this.httpobj.post(this.appurl + 'api/users', JSON.stringify(user), this.httpOptions).pipe();
    };
    UserService.prototype.errorHandler = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        console.log(errorMessage);
        return rxjs_1.throwError(errorMessage);
    };
    UserService = __decorate([
        __param(1, core_1.Inject('BASE_URL'))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
var UserDataModel = /** @class */ (function () {
    function UserDataModel() {
    }
    return UserDataModel;
}());
exports.UserDataModel = UserDataModel;
//# sourceMappingURL=users.service.js.map