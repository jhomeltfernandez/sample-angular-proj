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
var AccountService = /** @class */ (function () {
    function AccountService(httpobj, _baseurl, jwtHelper) {
        this.httpobj = httpobj;
        this.jwtHelper = jwtHelper;
        this.appurl = "";
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this.appurl = _baseurl;
    }
    AccountService.prototype.login = function (credentials) {
        return this.httpobj.post(this.appurl + 'api/account/authenticate', JSON.stringify(credentials), this.httpOptions).pipe();
    };
    AccountService.prototype.register = function (user) {
        return this.httpobj.post(this.appurl + 'api/account/register', JSON.stringify(user), this.httpOptions).pipe();
    };
    AccountService.prototype.logOut = function () {
        localStorage.removeItem("jwt");
    };
    AccountService.prototype.isUserAuthenticated = function () {
        var token = localStorage.getItem("jwt");
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        }
        else {
            return false;
        }
    };
    AccountService = __decorate([
        __param(1, core_1.Inject('BASE_URL'))
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map