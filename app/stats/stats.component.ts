import {
    Component, OnInit, Input,
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CurrencyService } from '../shared/service';
import { Currency } from '../model/currency';

@Component({
    moduleId: module.id,
    selector: 'my-stats',
    templateUrl: 'stats.component.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(-100%)' }),
                animate(1000)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'translateX(100%)' }))
            ])
        ])
    ],
    styles: ['.spanpointer { cursor: pointer} .dropdown { margin: 10px 0 0 28px}']
})

export class StatsComponent implements OnInit {
    rates: Array<any>;
    errorMessage: string;
    currency: Currency[];
    hasError: boolean = false;
    curr: any;
    options: Object;
    categories: Array<string> = ['USD', 'GBP', 'JPY', 'ILS'];
    dataValue: string;
    constructor(private currencyService: CurrencyService) { }

    private drawChart(data: any, value: string) {

        this.options = {
            title: { text: 'Bar chart' },
            series: [{
                name: 'Currency',
                data: (() => {
                    delete this.categories[value];
                    let updateData: Array<any> = [];
                    for (let i of this.categories) {
                        updateData.push(data[i])
                    }
                    return updateData;
                })(),
                dataLabels: {
                    enabled: true
                },
            }],
            xAxis: [{
                categories: this.categories
            }],
            chart: {
                type: 'column',
                width: 400,
                height: 400,
                style: {
                    fontFamily: 'serif'
                }
            }
        };
    }

    ngOnInit() {
        this.getCurrency();
        this.onchange('ILS');


    }


    getCurrency(): void {
        this.currencyService.getCurrency()
            .then(currency => this.currency = currency);

    }


    getRates(value: string) {

        this.currencyService.getRates(value)
            .subscribe(
            rates => {
                this.rates = rates;
                this.drawChart(this.rates, this.dataValue);
            },
            error => this.errorMessage = <any>error
            )
        return this.rates;

    }

    validateCurrency(value: any) {
        if (value === 'default') {
            this.hasError = true;
        } else {
            this.hasError = false;
        }
    }

    onchange(value: string) {
        this.categories = ['USD', 'GBP', 'JPY', 'ILS'];
        this.dataValue = value;
        let index = this.categories.indexOf(value);
        if (index > -1) {
            this.categories.splice(index, 1);
        }
        this.getRates(value);

    }
}