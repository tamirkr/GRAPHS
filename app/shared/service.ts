import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Currency } from '../model/currency';
import { CURRENCY } from '../model/mock-currency';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

@Injectable()

export class CurrencyService {
    apiUrl: string = 'http://api.fixer.io/latest?base=';
    constructor(private http: Http) { }

    getCurrency(): Promise<Currency[]> {
        return Promise.resolve(CURRENCY)
    }



    // getCurrencySlowly(): Promise<Currency[]> {
    //     return new Promise<Currency[]>(resolve =>
    //     setTimeout(resolve, 2000))
    //     .then(() => this.getCurrency())
    // }


    
    getRates(base: string): Observable<any[]> {
        return this.http.get(this.apiUrl + `${base}`)
            .map(this.extractData)
            .catch(this.handleError)
            
    }

    private extractData(response: Response) {
        let body = response.json();
        return body['rates'] || {} ;
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }


}