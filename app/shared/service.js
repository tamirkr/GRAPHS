"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var mock_currency_1 = require('../model/mock-currency');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/delay');
var CurrencyService = (function () {
    function CurrencyService(http) {
        this.http = http;
        this.apiUrl = 'http://api.fixer.io/latest?base=';
    }
    CurrencyService.prototype.getCurrency = function () {
        return Promise.resolve(mock_currency_1.CURRENCY);
    };
    // getCurrencySlowly(): Promise<Currency[]> {
    //     return new Promise<Currency[]>(resolve =>
    //     setTimeout(resolve, 2000))
    //     .then(() => this.getCurrency())
    // }
    CurrencyService.prototype.getRates = function (base) {
        return this.http.get(this.apiUrl + ("" + base))
            .map(this.extractData)
            .catch(this.handleError);
    };
    CurrencyService.prototype.extractData = function (response) {
        var body = response.json();
        return body['rates'] || {};
    };
    CurrencyService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    CurrencyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CurrencyService);
    return CurrencyService;
}());
exports.CurrencyService = CurrencyService;
//# sourceMappingURL=service.js.map